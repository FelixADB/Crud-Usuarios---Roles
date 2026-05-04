const RolModel = require('../models/rolModel');

exports.listarRoles = async (req, res) => {
    const roles = await RolModel.getAll();
    res.render('roles/index', { roles });
};

exports.crearRol = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).send("El nombre del rol es obligatorio.");
    
    await RolModel.create({ nombre, descripcion });
    res.redirect('/roles');
};

exports.mostrarEditar = async (req, res) => {
    const rol = await RolModel.getById(req.params.id);
    res.render('roles/editar', { rol });
};

exports.editarRol = async (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).send("El nombre del rol es obligatorio.");

    await RolModel.update(req.params.id, { nombre, descripcion });
    res.redirect('/roles');
};

exports.eliminarRol = async (req, res) => {
    await RolModel.delete(req.params.id);
    res.redirect('/roles');
};