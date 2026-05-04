const db = require('../config/db');

class RolModel {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM roles');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM roles WHERE id_rol = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { nombre, descripcion } = data;
        const [result] = await db.execute('INSERT INTO roles (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        return result;
    }

    static async update(id, data) {
        const { nombre, descripcion } = data;
        const [result] = await db.execute('UPDATE roles SET nombre = ?, descripcion = ? WHERE id_rol = ?', [nombre, descripcion, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM roles WHERE id_rol = ?', [id]);
        return result;
    }
}

module.exports = RolModel;