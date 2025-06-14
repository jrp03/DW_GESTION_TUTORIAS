const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

// Importando las rutas del servidor
const router = require('./routes/router');

// inicializaciones
const app = express();
// importando la base de datos
require('./database');
// Importando la configuración de passport
require('./passport/local-auth');
// configurando el puerto en escucha servidor 
const port = process.env.PORT || 3001;

// estableciendo el motor de plantillas EJS
app.set('view engine', 'ejs');
// configurando las vistas y archivos estáticos
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'tutorias-sistema',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// rutas 
app.use("/", router);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});