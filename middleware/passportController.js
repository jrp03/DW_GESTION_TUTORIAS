import { Strategy as LocalStrategy } from 'passport-local';
import Usuario from '../models/usuario.js';

export default function configurePassport(passport) {
    
    // Estrategia para registro local
    passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            // Obtiene la contraseña encriptada
            const hashedPassword = await Usuario.encripPassword(password);
            const userData = {
                username: username,
                password: hashedPassword,
                name: req.body.nombre
            };
            
            const nuevoUsuario = await Usuario.create(
                userData.username,
                userData.password,
                userData.name
            );
            
            return done(null, nuevoUsuario);
        } catch (error) {
            return done(error);
        }
    }));

    // Estrategia para login local
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const user = await Usuario.getByUsername(username);
            
            if (!user) {
                return done(null, false, req.flash('errors', `Este usuario "${username}" no existe`));
            }
            
            if (user) {
                // Comparar contraseña
                const match = await Usuario.verificarCredenciales(username, password);
                
                if (match === true) {
                    return done(null, user, null);
                } else {
                    return done(null, false, req.flash("errors", match));
                }
            }
        } catch (err) {
            return done(err);
        }
    }));

    // Serialización del usuario
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id);
    });

    // Deserialización del usuario
    passport.deserializeUser(async (id, done) => {
        try {
            const usuario = await Usuario.getById(id);
            done(null, usuario);
        } catch (error) {
            done(error, null);
        }
    });
}