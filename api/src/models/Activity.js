const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego ejecutamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo TouristActivity que se refiere a todas las actividades turísticas
  // usamos el sequelize.define para crear la tabla
  sequelize.define('touristActivity', {
    // ID es autoincremental para este modelo
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Nombre de la actividad turística
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Esto significa que el nombre es un campo requerido
    },
    // Dificultad de la actividad turística, que va de 1 a 5
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false, // Esto significa que la dificultad es un campo requerido
      validate: { min: 1, max: 5 } // Esto garantiza que el valor esté entre 1 y 5
    },
    // Duración de la actividad turística en horas
    duration: {
      type: DataTypes.INTEGER, // Asumimos que la duración se mide en horas completas, por eso usamos INTEGER
      allowNull: true, // Este campo puede ser nulo porque no todas las actividades tendrán una duración definida
    },
    // Temporada en la que se realiza la actividad turística
    season: {
      type: DataTypes.ENUM('summer', 'winter', 'spring', 'autumn'),
      allowNull: false, // Esto significa que la temporada es un campo requerido
    },
  });
};
