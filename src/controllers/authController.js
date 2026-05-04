const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

exports.mostrarLogin = (req, res) => {
    // Si ya inició sesión, lo mandamos al panel
    if (req.session.usuario) return res.redirect('/usuarios');
    res.render('auth/login', { error: null });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const usuario = await UsuarioModel.getByEmail(email);
        
        // Validar si el usuario existe y la contraseña encriptada coincide
        if (usuario && await bcrypt.compare(password, usuario.password)) {
            // Guardamos los datos en la sesión
            req.session.usuario = {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                rol: usuario.id_rol
            };
            return res.redirect('/usuarios');
        } else {
            return res.render('auth/login', { error: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        return res.render('auth/login', { error: 'Error en el servidor' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};