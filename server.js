import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from './routes/index.js';

// Configuración básica
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rutas de archivos estáticos
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// Rutas de dashboard
app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

app.get('/user/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
});

app.get('/materias', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'materias.html'));
});

app.get('/maestros', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'maestros.html'));
});

app.get('/asesores', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'asesores.html'));
});

app.get('/solicitudes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'solicitudes.html'));
});

app.get('/masters', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'masters.html'));
});

// Simulador de conexión a base de datos
//app.get('/api/test-db', (req, res) => {
//    res.json({ 
//        message: 'Modo simulación activado', 
//        warning: 'No hay conexión real a base de datos',
//        data: []
//    });
//});
//
//// Sistema de autenticación simulado
//app.post('/api/auth/login', (req, res) => {
//    const { username, password } = req.body;
//    const result = dummyAuth.login(username, password);
//    
//    if (result.success) {
//        res.json({ 
//            token: result.token, 
//            user: result.user,
//            redirectTo: result.redirectTo,
//            message: "Autenticación simulada exitosa"
//        });
//    } else {
//        res.status(401).json({ 
//            error: result.error || "Credenciales inválidas",
//            debug: "Usa 'admin/admin123' o 'user/user123'"
//        });
//    }
//});
//
//app.get('/api/auth/verify', (req, res) => {
//    const token = req.headers.authorization?.split(' ')[1];
//    const result = dummyAuth.verifyToken(token);
//    
//    res.status(result.success ? 200 : 401).json({
//        ...result,
//        debug: result.success ? "Token verificado (simulación)" : "Token inválido"
//    });
//});

// Rutas de la API
app.use('/api', routes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error('Error global:', err);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        mode: 'Modo simulación (sin base de datos real)',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Añadir después de los middlewares y antes de las rutas:
//const authenticate = (req, res, next) => {
//    const token = req.headers.authorization?.split(' ')[1];
//    const result = dummyAuth.verifyToken(token);
//    
//    if (!result.success) {
//        return res.status(401).json({ error: "Acceso no autorizado" });
//    }
//    
//    req.user = result.user;
//    next();
//};
//
//// Modificar las rutas de dashboard:
//app.get('/admin/dashboard', authenticate, (req, res) => {
//    if (req.user.role !== 'admin') {
//        return res.status(403).redirect('/user/dashboard');
//    }
//    res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
//});
//
//app.get('/user/dashboard', authenticate, (req, res) => {
//    res.sendFile(path.join(__dirname, 'public', 'user-dashboard.html'));
//});
//
//// Mantener el resto del archivo igual
//
//
//
//
//// Iniciar servidor
//app.listen(PORT, () => {
//    console.log(`\nServidor en modo simulación (sin base de datos)`);
//    console.log(`http://localhost:${PORT}`);
//    console.log(`\nCredenciales de prueba:`);
//    console.log(`Admin: admin/admin123`);
//    console.log(`Usuario normal: user/user123\n`);
//});

export default app; 