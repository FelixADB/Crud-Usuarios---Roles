const UsuarioModel = require('../models/usuarioModel');
const RolModel = require('../models/rolModel'); // Necesario para el desplegable
const bcrypt = require('bcryptjs');

exports.listarUsuarios = async (req, res) => {
    const usuarios = await UsuarioModel.getAll();
    const roles = await RolModel.getAll(); // Para cargar en el formulario de creación
    res.render('usuarios/index', { usuarios, roles });
};

exports.crearUsuario = async (req, res) => {
    const { nombre, email, password, id_rol } = req.body;
    
    // Validación Backend
    if (!nombre || !email || !password || !id_rol) {
        return res.status(400).send("Todos los campos obligatorios deben ser llenados.");
    }

    const imagen = req.file ? '/uploads/' + req.file.filename : '/uploads/default.png';
    const hashedPassword = await bcrypt.hash(password, 10);

    await UsuarioModel.create({ nombre, email, password: hashedPassword, id_rol, imagen });
    res.redirect('/usuarios');
};

exports.mostrarEditar = async (req, res) => {
    const usuario = await UsuarioModel.getById(req.params.id);
    const roles = await RolModel.getAll();
    res.render('usuarios/editar', { usuario, roles });
};

exports.editarUsuario = async (req, res) => {
    const { nombre, email, id_rol, imagen_actual } = req.body;
    
    if (!nombre || !email || !id_rol) {
        return res.status(400).send("Nombre, email y rol son obligatorios.");
    }

    // Lógica para mantener la imagen anterior si no se sube una nueva
    let imagen = imagen_actual; 
    if (req.file) {
        imagen = '/uploads/' + req.file.filename;
    }

    await UsuarioModel.update(req.params.id, { nombre, email, id_rol, imagen });
    res.redirect('/usuarios');
};

exports.eliminarUsuario = async (req, res) => {
    await UsuarioModel.delete(req.params.id);
    res.redirect('/usuarios');
};