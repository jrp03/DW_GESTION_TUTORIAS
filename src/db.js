const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',  // Dirección de tu base de datos MySQL  
    user: 'root', // Usuario de tu base de datos MySQL
    password: '', // Contraseña de tu base de datos MySQL
    port: 3306, // Puerto de tu base de datos MySQL (por defecto es 3306)
    database: '', // Nombre de tu base de datos
});

module.exports = { pool };
