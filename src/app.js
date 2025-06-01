var createError = require('http-errors');
var helmet = require('helmet');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const routes = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');

// Importar el router principal
var principalRouter = require('./routes/principal');

var app = express();

// Configuración para __dirname en ES modules
//const __filename = fileURLToPath(import.meta.url)
//const __dirname = path.dirname(__filename)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // Cambia 'html' por el motor de vistas que estés usando
// Si estás usando un motor de plantillas como EJS, Pug, etc., puedes configurarlo aquí
// Por ejemplo, si usas EJS:
// app.set('view engine', 'ejs');
// Configurar el middleware de layouts
app.use(expressLayouts);

// Establecer el layout predeterminado
app.set('layout', 'layout/layoutPrincipal'); // layout.ejs será el archivo base


// Configurar el motor de vistas o paginas. Depende del framework que uses
// Si estás usando EJS, Pug, Handlebars, etc., ajusta el motor de vistas.
// app.set('view engine', 'ejs'); // Ejemplo para EJS



// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configurar rutas de la API
app.use("./api", routes)


app.use(helmet()); // Use helmet for security

// Rutas para las páginas de autenticación
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"))
})

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"))
})

// Rutas para las páginas protegidas
// Estas rutas ahora requieren autenticación en el frontend
app.get("/materias", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "materias.html"))
})

app.get("/maestros", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "maestros.html"))
})

app.get("/asesores", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "asesores.html"))
})

app.get("/solicitudes", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "solicitudes.html"))
})

app.get("/masters", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "masters.html"))
})

// app.get("/principal", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "principal.html"));
// });
app.use("/principal", principalRouter);

// Ruta para la página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"))
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // responde con JSON o texto plano
  res.status(err.status || 500);
  res.send('Error: ' + err.message);
});




module.exports = app;
