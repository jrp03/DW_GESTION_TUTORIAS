<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta_temporal"

// Controlador para la autenticación
const authController = {
  /**
   * Iniciar sesión
   */
  login: async (req, res) => {
    try {
      const { username, password } = req.body

      if (!username || !password) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "Por favor, proporciona nombre de usuario y contraseña.",
        })
      }

      const usuario = await Usuario.verificarCredenciales(username, password)

      if (!usuario) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "Credenciales inválidas.",
        })
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: usuario.id, username: usuario.username, rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: "8h" }, // El token expira en 8 horas
      )

      res.json({
        STATUS: "OK",
        DATA: {
          token,
          usuario: {
            id: usuario.id,
            username: usuario.username,
            nombre: usuario.nombre,
            rol: usuario.rol,
          },
        },
      })
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
      })
    }
  },

  /**
   * Registrar un nuevo usuario
   */
  register: async (req, res) => {
    try {
      const { username, password, nombre, rol } = req.body

      if (!username || !password || !nombre) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "Por favor, completa todos los campos requeridos.",
        })
      }

      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.getByUsername(username)
      if (usuarioExistente.STATUS === "OK" && usuarioExistente.DATA.length > 0) {
        return res.status(400).json({
          STATUS: "ERROR",
          ERROR: "El nombre de usuario ya está en uso.",
        })
      }

      // Crear el nuevo usuario
      const result = await Usuario.create({
        username,
        password,
        nombre,
        rol,
      })

      if (result.STATUS !== "OK") {
        return res.status(500).json({
          STATUS: "ERROR",
          ERROR: result.ERROR || "Error al crear el usuario.",
        })
      }

      res.status(201).json({
        STATUS: "OK",
        MESSAGE: "Usuario creado correctamente.",
      })
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
      })
    }
  },

  /**
   * Verificar el token JWT
   */
  verificarToken: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]

      if (!token) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "No se proporcionó token de autenticación.",
        })
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.json({
          STATUS: "OK",
          DATA: {
            usuario: decoded,
          },
        })
      } catch (error) {
        return res.status(401).json({
          STATUS: "ERROR",
          ERROR: "Token inválido o expirado.",
        })
      }
    } catch (error) {
      res.status(500).json({
        STATUS: "ERROR",
        ERROR: error.message,
      })
    }
  },
}

module.exports = authController;
=======
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
>>>>>>> prueba-validacion
