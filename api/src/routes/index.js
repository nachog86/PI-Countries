// Importamos Router de express. Esto nos permitirá crear un nuevo router
// para manejar las rutas de nuestra aplicación
const { Router } = require('express');

// Importamos los controladores que definimos para cada ruta
const { getAllCountries, getCountryById, getCountriesByName } = require('../controllers/countries');
// Importación de los controladores
const { createActivity, getAllActivities } = require('../controllers/activities');

// Creamos una nueva instancia de Router
const router = Router();

// Definimos la ruta GET para '/', que recupera todos los países
// Usamos el controlador getAllCountries que hemos importado
// Este controlador se encargará de la lógica de recuperar la información de la base de datos
router.get('/countries', getAllCountries);

// Definimos la ruta GET para '/:idPais', que recupera un país específico por su ID
// Usamos el controlador getCountryById que hemos importado
// Este controlador se encargará de la lógica de recuperar la información de la base de datos
router.get('/countries/id/:id', getCountryById);

// Definimos la ruta GET para '/name', que recupera los países que coinciden con un nombre específico
// Usamos el controlador getCountriesByName que hemos importado
// Este controlador se encargará de la lógica de recuperar la información de la base de datos
router.get('/countries/name', getCountriesByName);

// Ruta para obtener todas las actividades
// Cuando el cliente envía una solicitud GET a /activities, se llama a la función getAllActivities
// La función getAllActivities se encarga de manejar la solicitud y enviar una respuesta
router.get('/activities', getAllActivities);

// Ruta para crear una nueva actividad
// Cuando el cliente envía una solicitud POST a /activities, se llama a la función createActivity
// La función createActivity se encarga de manejar la solicitud, crear la nueva actividad y enviar una respuesta
router.post('/activities', createActivity);

// Exportamos nuestro router para poder usarlo en otros archivos de nuestro proyecto
module.exports = router;

