const db = require('../config/db');

class UsuarioModel {
    static async getAll() {
        const [rows] = await db.execute(`
            SELECT u.id_usuario, u.nombre, u.email, u.imagen, r.nombre AS rol, r.id_rol 
            FROM usuarios u 
            LEFT JOIN roles r ON u.id_rol = r.id_rol
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { nombre, email, password, id_rol, imagen } = data;
        const [result] = await db.execute(
            'INSERT INTO usuarios (nombre, email, password, id_rol, imagen) VALUES (?, ?, ?, ?, ?)',
            [nombre, email, password, id_rol, imagen]
        );
        return result;
    }

    static async update(id, data) {
        const { nombre, email, id_rol, imagen } = data;
        const [result] = await db.execute(
            'UPDATE usuarios SET nombre = ?, email = ?, id_rol = ?, imagen = ? WHERE id_usuario = ?',
            [nombre, email, id_rol, imagen, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        return result;
    }

    static async getByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }
}

module.exports = UsuarioModel;