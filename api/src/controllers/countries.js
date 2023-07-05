// Importamos los módulos que necesitamos
// Los modelos Sequelize Country y TouristActivity para interactuar con la base de datos
// axios para hacer solicitudes HTTP a la API de Rest Countries
// Op de Sequelize para operadores avanzados de búsqueda
const { Country, TouristActivity } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

const getAllCountries = async (req, res, next) => {
    try {
        let countriesInDb = await Country.findAll({
            include: TouristActivity
        });

        if (countriesInDb.length === 0) {
            let response = await axios.get('https://restcountries.com/v3/all');
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
            countriesInDb = await Country.findAll({
                include: TouristActivity
            });
        }
        res.json(countriesInDb);

    } catch (error) {
        next(error);
    }
}

const getCountryById = async (req, res, next) => {
    try {
        // Aquí cambiamos 'idPais' a 'id' para coincidir con el parámetro de ruta que hemos definido
        const country = await Country.findByPk(req.params.id.toUpperCase(), {
            include: TouristActivity
        });

        if (country) {
            res.json(country);
        } else {
            res.status(404).send('Country not found');
        }

    } catch (error) {
        next(error);
    }
}


const getCountriesByName = async (req, res, next) => {
    try {
        // Nota: la función toLowerCase() convierte todos los caracteres alfabéticos a minúsculas para evitar problemas de coincidencia de mayúsculas y minúsculas
        const name = req.params.name.toLowerCase();

        const countries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: TouristActivity
        });

        // Verificamos si se encontraron países
        if (countries && countries.length > 0) {
            // Si se encontraron países, los enviamos en la respuesta
            res.json(countries);
        } else {
            // Si no se encontraron países, enviamos un código de estado 404 y un mensaje de error
            res.status(404).send('No countries found with that name');
        }

    } catch (error) {
        // Si hay algún error, lo pasamos al siguiente middleware (en este caso, el middleware de manejo de errores)
        next(error);
    }
}




module.exports = {
    getAllCountries,
    getCountryById,
    getCountriesByName
}
