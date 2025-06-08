const passport = require('passport');
const Usuario = require('../models/usuario');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    
    // Modelo que registra al usuario en la base de datos
passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        // Obtiene la contraseña encriptada
        const hashedPassword = await Usuario.encripPassword(password);
        const ObtenerDatos = {
            username: username,
            password: hashedPassword,
            name: req.body.nombre
        };
        const nuevoUsuario = await Usuario.create(
            ObtenerDatos.username,
            ObtenerDatos.password,
            ObtenerDatos.name
        );
        return done(null, nuevoUsuario);
    }
))

    // Modelo que valida que el usuario ya esta registrado en la base de datos
passport.use('local-login', new LocalStrategy({
        usernameField: 'username', // Campo para el nombre de usuario
        passwordField: 'password', // Campo para la contraseña
        passReqToCallback: true // Pasar el request completo al callback
    }, async (req, username, password, done) => {
        try{
            const user = await Usuario.getByUsername(username);
            if(!user){
                return done(null, false, req.flash('errors', `Este usuario "${username}" no existe `));
            }
            if(user){
                // Comparar contraseña
                const match = await Usuario.verificarCredenciales(username,password);
                if(match === true){
                    return done(null, user,null);
                }else{
                    return done(null, false,req.flash("errors",match))
                }
            }
        }catch (err) {
            return done(null,false, err)
        }
    }
    
    ));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id); // Serializar el ID del usuario
});

passport.deserializeUser(async (id, done) => {
    Usuario.getById(id)
        .then((usuario) => {
            return done(null, usuario);
        })
        .catch((error) => {
            return done(error, null); 
        });
});

// Modelo que permite redifeccionar a una pagina solo si esta usuario activo

}
