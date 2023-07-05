// Importamos los módulos que necesitamos
// Los modelos Sequelize Country y TouristActivity para interactuar con la base de datos
// axios para hacer solicitudes HTTP a la API de Rest Countries
// Op de Sequelize para operadores avanzados de búsqueda
const { Country, TouristActivity } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

// Función para obtener todos los países
// Si la base de datos no tiene datos, llama a la API de Rest Countries
// para obtener datos y llenar la base de datos.
const getAllCountries = async (req, res, next) => {
    try {
        // Intenta obtener todos los países de la base de datos
        let countriesInDb = await Country.findAll({
            include: TouristActivity
        });

        // Si no hay países en la base de datos
        if (countriesInDb.length === 0) {
            // Haz una petición a la API de Rest Countries
            let response = await axios.get('https://restcountries.com/v3/all');
            // Para cada país en la respuesta, crea un registro en la base de datos
            await Promise.all(response.data.map(country => {
                return Country.create({
                    id: country.cca3,
                    name: country.name.common,
                    flagImage: country.flags[1], 
                    continent: country.region,
                    capital: country.capital && country.capital[0],
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population,
                })
            }));
            // Obtiene todos los países de la base de datos nuevamente
            countriesInDb = await Country.findAll({
                include: TouristActivity
            });
        }
        // Envía la lista de países como respuesta
        res.json(countriesInDb);

    } catch (error) {
        // Si hay algún error, pasa al siguiente middleware (manejador de errores)
        next(error);
    }
}

// Función para obtener un país por su ID
// Busca un país en la base de datos por su ID
const getCountryById = async (req, res, next) => {
    try {
        // Busca el país en la base de datos por su ID
        const country = await Country.findByPk(req.params.id.toUpperCase(), {
            include: TouristActivity
        });

        // Si el país existe, envía el país como respuesta
        if (country) {
            res.json(country);
        } else {
            // Si no se encuentra el país, envía un mensaje de error
            res.status(404).send('Country not found');
        }

    } catch (error) {
        // Si hay algún error, pasa al siguiente middleware (manejador de errores)
        next(error);
    }
}

// Función para obtener países por nombre
// Busca países en la base de datos que coincidan con el nombre
// pasado como parámetro de consulta en la URL
const getCountriesByName = async (req, res, next) => {
    try {
        // Obtiene el nombre del país de los parámetros de consulta en la URL
        const name = req.query.name.toLowerCase();

        // Busca países en la base de datos que coincidan con el nombre
        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: TouristActivity
        });

        // Si se encontraron países, envía los países como respuesta
        if (countries && countries.length > 0) {
            res.json(countries);
        } else {
            // Si no se encontraron países, envía un mensaje de error
            res.status(404).send('No countries found with that name');
        }

    } catch (error) {
        // Si hay algún error, pasa al siguiente middleware (manejador de errores)
        next(error);
    }
}

// Exportamos las funciones para que puedan ser usadas en otros archivos
module.exports = {
    getAllCountries,
    getCountryById,
    getCountriesByName
}
