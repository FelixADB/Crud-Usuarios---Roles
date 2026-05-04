const db = require('../config/db');

class RolModel {
    static async getAll() {
        const result = await db.query('SELECT * FROM roles ORDER BY id_rol ASC');
        return result.rows;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM roles WHERE id_rol = $1', [id]);
        return result.rows[0];
    }

    static async create(data) {
        const { nombre, descripcion } = data;
        const result = await db.query('INSERT INTO roles (nombre, descripcion) VALUES ($1, $2) RETURNING *', [nombre, descripcion]);
        return result.rows[0];
    }

    static async update(id, data) {
        const { nombre, descripcion } = data;
        const result = await db.query('UPDATE roles SET nombre = $1, descripcion = $2 WHERE id_rol = $3 RETURNING *', [nombre, descripcion, id]);
        return result.rows[0];
    }

    static async delete(id) {
        await db.query('DELETE FROM roles WHERE id_rol = $1', [id]);
        return true;
    }
}

module.exports = RolModel;