const express = require('express');
const path = require('path');
// Importando las rutas del servidor
const router = require('./routes/router');

const app = express();
// configurando el puerto en escucha servidor 
const port = process.env.PORT || 3001;

// estableciendo el motor de plantillas EJS
app.set('view engine', 'ejs');
// configurando las vistas y archivos estáticos
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// rutas 
app.use("/", router);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});