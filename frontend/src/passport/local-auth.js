const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user'); // Ensure the user model is loadedC1);


passport.serializeUser((user, done) =>{
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
// passport.deserializeUser( async (id, done) =>{
//     // consulta a la base de datos para saver si el usuario existe
//     await User.findById(id);
//     done(null, user);
// });


passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
}, async (req, email, password, done) => {
    const user = new User();
    user.email = email;
    user.password = password;
    await user.save();
    done(null, user);
}));