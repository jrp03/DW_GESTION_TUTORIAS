// const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const { name } = require('ejs');

// Controlador para la autenticación
const authController = {
 
 // ------ Pagina de inicio
 
  /**
   * Iniciar sesión 
   */
async login(req, res) {
    const errors = req.flash("error"); // O "errors", según cómo lo guardes en passport
    await res.render('login.ejs', {
        errors: errors && errors.length > 0 ? errors : []
    });
},


// --------- Pagina de Registro --------
 /**
   * Acceso pagina de registro
   */
async register(req, res) {
  
  const errors = req.flash("errors");
  await res.render('register.ejs', {
    errors: errors && errors.length > 0 ? errors : []
  });
},
 
/**
   * Registrar nuevo usuario (Metodo sin usar Passport)
   */
async crearUsuario(req,res){
  // Validar campos
  const validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    const errors = Object.values(validationErrors.mapped());
    const errorsArr = errors.map(item => item.msg);
    req.flash("errors", errorsArr);
    return res.redirect("/register");
  }
  // crear usuario
  try{
    // Hashear la contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const nuevoUsuario = {
      username: req.body.username,
      password: hashedPassword,
      name: req.body.nombre
    };
    await Usuario.create(
      nuevoUsuario.username,
      nuevoUsuario.password,
      nuevoUsuario.name
    );
      return res.redirect('/login');

  } catch (err) {
      req.flash("errors", [err.message || String(err)]);
    return res.redirect("/register");
  }
  
}

}
module.exports = authController;