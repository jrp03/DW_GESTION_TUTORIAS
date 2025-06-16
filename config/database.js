import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'proyecto_node',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Test de conexión
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
})();

export default pool;