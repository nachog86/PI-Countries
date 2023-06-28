// Importamos los módulos que necesitamos
// Los modelos Sequelize Country y TouristActivity para interactuar con la base de datos
const { Country, TouristActivity } = require('../db');

// Definimos una función asíncrona para manejar las solicitudes POST a la ruta /activities
const createActivity = async (req, res, next) => {
    try {
        // Creamos una nueva actividad turística en la base de datos con los datos proporcionados en el body de la solicitud
        const activity = await TouristActivity.create(req.body);

        // Asociamos la actividad turística que acabamos de crear con los países proporcionados en el body de la solicitud
        // Esto se hace utilizando el método setCountries que proporciona Sequelize cuando se define una relación de muchos a muchos
        await activity.setCountries(req.body.countries);

        // Enviamos un código de estado 201 para indicar que la actividad turística se creó con éxito
        res.status(201).send('Activity created successfully');
        
    } catch (error) {
        // Si ocurre algún error durante este proceso, lo pasamos al siguiente middleware (en este caso, el middleware de manejo de errores)
        next(error);
    }
}

// Definimos una función asíncrona para manejar las solicitudes GET a la ruta /activities
const getAllActivities = async (req, res, next) => {
    try {
        // Intentamos obtener todas las actividades turísticas de la base de datos
        // Esto incluirá cualquier país asociado gracias a la asociación que hemos definido en nuestro modelo
        const activities = await TouristActivity.findAll({
            include: Country
        });

        // Enviamos las actividades obtenidas como respuesta
        res.json(activities);
        
    } catch (error) {
        // Si ocurre algún error durante este proceso, lo pasamos al siguiente middleware (en este caso, el middleware de manejo de errores)
        next(error);
    }
}

// Exportamos nuestras funciones para poder usarlas en otros archivos
module.exports = {
    createActivity,
    getAllActivities
}
