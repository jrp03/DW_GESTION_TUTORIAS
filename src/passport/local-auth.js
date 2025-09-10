const passport = require("passport")
const LocalStrategy = require ('passport-local').Strategy;
const Usuario = require('../models/usuario.js');

passport.use('local-registro', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    }, (req,username,password, done) => {
        async (req, username, password, done) => {
            try{ 
                const {nombre} = req.body; // Extrae el nombre del cuerpo de la solicitud
                console.log('Datos de registro:', { username})
                const nuevoUsuario = await Usuario.create(username, password, nombre);
                console.log('Usuario registrado:', nuevoUsuario);
                // registro exitoso
                return done(null, nuevoUsuario);
            } catch (error) {
                console.error('Error al registrar usuario:', error);
                return done(error);
            }
       }
    }));



module.exports = passport
