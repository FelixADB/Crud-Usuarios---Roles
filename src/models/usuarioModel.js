const db = require('../config/db');

class UsuarioModel {
    static async getAll() {
        const result = await db.query(`
            SELECT u.id_usuario, u.nombre, u.email, u.imagen, r.nombre AS rol, r.id_rol 
            FROM usuarios u 
            LEFT JOIN roles r ON u.id_rol = r.id_rol
            ORDER BY u.id_usuario ASC
        `);
        return result.rows;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
        return result.rows[0];
    }

    static async getByEmail(email) {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows[0];
    }

    static async create(data) {
        const { nombre, email, password, id_rol, imagen } = data;
        const result = await db.query(
            'INSERT INTO usuarios (nombre, email, password, id_rol, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, email, password, id_rol, imagen]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre, email, id_rol, imagen } = data;
        const result = await db.query(
            'UPDATE usuarios SET nombre = $1, email = $2, id_rol = $3, imagen = $4 WHERE id_usuario = $5 RETURNING *',
            [nombre, email, id_rol, imagen, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await db.query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
        return true;
    }
}

module.exports = UsuarioModel;