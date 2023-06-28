// Importamos los módulos que necesitamos
// Los modelos Sequelize Country y TouristActivity para interactuar con la base de datos
// axios para hacer solicitudes HTTP a la API de Rest Countries
// Op de Sequelize para operadores avanzados de búsqueda
const { Country, TouristActivity } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

// Definimos una función asíncrona para manejar las solicitudes GET a la ruta /countries
const getAllCountries = async (req, res, next) => {
    try {
        // Intentamos obtener todos los países de la base de datos
        // Esto incluirá cualquier actividad turística asociada gracias a la asociación que hemos definido en nuestro modelo
        let countriesInDb = await Country.findAll({
            include: TouristActivity
        });

        // Si la base de datos está vacía, es decir, es la primera vez que se realiza esta solicitud,
        // hacemos una solicitud a la API de Rest Countries para obtener los datos
        if (countriesInDb.length === 0) {
            let response = await axios.get('https://restcountries.com/v3/all');

            // Para cada país que recibimos de la API de Rest Countries, creamos un nuevo país en nuestra base de datos
            // Solo almacenamos los datos que nos interesan para esta aplicación
            await Promise.all(response.data.map(country => {
                return Country.create({
                    id: country.cca3,
                    name: country.name.common,
                    flag: country.flags[1], // Aquí cambiamos flags.png a flags[1] para obtener la url de la bandera
                    continent: country.region,
                    capital: country.capital && country.capital[0],
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population,
                })
            }));

            // Después de llenar la base de datos, obtenemos todos los países nuevamente para enviarlos en la respuesta
            countriesInDb = await Country.findAll({
                include: TouristActivity
            });
        }

        // Enviamos los países obtenidos como respuesta
        res.json(countriesInDb);

    } catch (error) {
        // Si ocurre algún error durante este proceso, lo pasamos al siguiente middleware (en este caso, el middleware de manejo de errores)
        next(error);
    }
}

// Definimos una función asíncrona para manejar las solicitudes GET a la ruta /countries/:idPais
const getCountryById = async (req, res, next) => {
    try {
        console.log('Buscando país con ID:', req.params.idPais); // Agregamos un registro de consola aquí

        // Intentamos encontrar un país en la base de datos con la ID proporcionada en los parámetros de la ruta
        const country = await Country.findByPk(req.params.idPais.toUpperCase(), {
            include: TouristActivity
        });

        console.log('País encontrado:', country); // Agregamos otro registro de consola aquí

        // Si encontramos un país, lo enviamos como respuesta
        if (country) {
            res.json(country);
        } else {
            // Si no encontramos un país, enviamos un código de estado 404 y un mensaje de error
            res.status(404).send('Country not found');
        }

    } catch (error) {
        // Si ocurre algún error durante este proceso, lo pasamos al siguiente middleware (en este caso, el middleware de manejo de errores)
        next(error);
    }
}



// Definimos una función asíncrona para manejar las solicitudes GET a la ruta /countries/name?="..."
const getCountriesByName = async (req, res, next) => {
    try {
        console.log(`Searching for countries with name: ${req.query.name}`);
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${req.query.name}%`
                }
            },
            include: TouristActivity,
            logging: console.log  // esto mostrará la consulta SQL en tu consola
        });
        

        console.log(`Countries found: ${countries.length}`);

        if (countries.length > 0) {
            res.json(countries);
        } else {
            res.status(404).send('No countries found with that name');
        }

    } catch (error) {
        next(error);
    }
}




// Exportamos nuestras funciones para poder usarlas en otros archivos
module.exports = {
    getAllCountries,
    getCountryById,
    getCountriesByName
}
