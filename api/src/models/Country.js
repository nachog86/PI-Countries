const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego ejecutamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo Country
  sequelize.define('country', {
    // ID es el código de tres letras, lo mantenemos como un STRING
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    // Nombre del país
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Esto significa que el nombre es un campo requerido
    },
    // Imagen de la bandera
    flagImage: {
      type: DataTypes.STRING, // Normalmente las imágenes se guardan como URL, por eso es un STRING
      allowNull: false, // algunos paises no tiene banderas entonces q nos permita valores nulos
    },
    // Continente
    continent: {
      type: DataTypes.STRING,
      allowNull: false, // Si se requiere el continente
    },
    // Capital
    capital: {
      type: DataTypes.STRING,
      allowNull: true, // Este campo puede ser nulo porque no todos los países tienen capital
    },
    // Subregión
    subregion: {
      type: DataTypes.STRING,
      allowNull: true, // Este campo puede ser nulo porque no todos los países tienen subregión
    },
    // Área
    area: {
      type: DataTypes.FLOAT, // Usamos FLOAT porque el área puede tener decimales
      allowNull: true, // Este campo puede ser nulo porque no todos los países tienen área definida
    },
    // Población
    population: {
      type: DataTypes.INTEGER, // La población normalmente es un número entero, por eso usamos INTEGER
      allowNull: false, // Esto significa que la población es un campo requerido
    },
  });
};
