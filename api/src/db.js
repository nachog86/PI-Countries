// importamos la librería dotenv que nos permite manejar variables de entorno
require('dotenv').config();

// importamos Sequelize, que es la librería que nos permite interactuar con la base de datos
const { Sequelize } = require('sequelize');

// importamos la librería fs (file system) que nos permite trabajar con archivos en nuestro sistema
const fs = require('fs');

// importamos la librería path que nos proporciona utilidades para trabajar con rutas de archivos
const path = require('path');

// desestructuramos las variables de entorno que necesitamos para la conexión a la base de datos
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// creamos una instancia de Sequelize para conectarnos a nuestra base de datos de Postgres
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false,
  native: false,
});

// obtenemos el nombre de nuestro archivo actual
// lo hacemos para evitar que se importe a sí mismo cuando leamos todos los archivos en el directorio 'models'
const basename = path.basename(__filename);

// creamos un arreglo para almacenar nuestros definidores de modelo
// Esto es necesario porque vamos a importar todos los modelos como funciones que definen los modelos,
// y necesitamos un lugar para almacenarlos para poder usarlos más tarde
const modelDefiners = [];

// leemos todos los archivos en la carpeta 'models', los importamos y los añadimos a modelDefiners
// hacemos esto para que podamos tener todos nuestros modelos en archivos separados para una mejor organización,
// pero aún así poderlos importar todos de una vez y definirlos en nuestra base de datos
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// inyectamos la instancia de Sequelize en todos los definidores de modelo
// hacemos esto porque cada definidor de modelo es una función que necesita una instancia de Sequelize para poder definir un modelo.
// Pasar la instancia de Sequelize como argumento permite que los modelos se definan correctamente
modelDefiners.forEach(model => model(sequelize));

// capitalizamos los nombres de los modelos y los almacenamos de nuevo en sequelize.models
// hacemos esto para asegurarnos de que todos los nombres de los modelos estén en formato de mayúsculas para cumplir con las convenciones de nomenclatura y consistencia en nuestra base de datos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// desestructuramos los modelos que hemos definido
// hacemos esto para que podamos usar los nombres de los modelos directamente en nuestro código sin tener que acceder a ellos a través de sequelize.models cada vez.
// Esto mejora la legibilidad y eficiencia de nuestro código.
const { Country, TouristActivity } = sequelize.models;

// definimos la relación de muchos a muchos entre Country y TouristActivity
Country.belongsToMany(TouristActivity, { through: 'country_activity' });
TouristActivity.belongsToMany(Country, { through: 'country_activity' });

// exportamos los modelos y la conexión a la base de datos
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
