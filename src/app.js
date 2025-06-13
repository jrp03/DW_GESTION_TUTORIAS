var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const engine = require('ejs-mate');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// inicializa la aplicación Express
var app = express();


// Configuración del motor de plantillas EJS
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Directorio de vistas
app.use(express.static(path.join(__dirname, '../public')));

// middleware para servir archivos estáticos
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('clave_secreta'));
app.use(session({
    secret: "clave_secreta",
    resave: true,
    saveUninitialized: false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());



// Rutas paginas de inicio
app.use('/', require('./routes/index')); // Utiliza estas rutas cada vez que se accede a la pagina principal del sitio





// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // responde con JSON o texto plano
    res.status(err.status || 500);
    res.send('Error: ' + err.message);
});


module.exports = app;