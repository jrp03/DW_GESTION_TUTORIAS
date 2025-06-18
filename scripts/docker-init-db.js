import { db } from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function executeBatches() {
  try {
    console.log('📦 Iniciando configuración de la base de datos...');
    
    // 1. Leer el archivo SQL
    const sqlScriptPath = path.join(__dirname, '../usuarios.sql');
    const sqlContent = fs.readFileSync(sqlScriptPath, 'utf8');
    const batches = sqlContent.split('GO').filter(b => b.trim());
    
    // 2. Conectar a la base de datos maestra
    const pool = await db.connect();
    
    // 3. Ejecutar cada lote con manejo de errores
    for (const [index, batch] of batches.entries()) {
      try {
        await pool.request().query(batch);
        console.log(`✓ Lote ${index + 1}/${batches.length} ejecutado`);
      } catch (error) {
        console.error(`✗ Error en lote ${index + 1}:`, error.message);
        console.log('Consulta problemática:', batch.substring(0, 100) + '...');
        throw error;
      }
    }
    
    console.log('\n🎉 ¡Base de datos configurada exitosamente!');
  } catch (error) {
    console.error('\n❌ Error durante la inicialización:', error.message);
    process.exit(1);
  } finally {
    try {
      await sql.close();
      console.log('🔌 Conexión cerrada correctamente');
    } catch (closeError) {
      console.error('⚠️ Error al cerrar conexión:', closeError.message);
    }
  }
}

executeBatches();