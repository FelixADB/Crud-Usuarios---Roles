const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const usuarioRoutes = require('./routes/usuarioRoutes');
const rolRoutes = require('./routes/rolRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

// Configuraciones EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de la Sesión
app.use(session({
    secret: 'secreto_super_seguro_123',
    resave: false,
    saveUninitialized: false
}));

// Pasar la sesión a todas las vistas automáticamente
app.use((req, res, next) => {
    res.locals.usuarioActual = req.session.usuario || null;
    next();
});

// Rutas Públicas
app.use('/', authRoutes);

// Rutas Protegidas
app.use('/usuarios', authMiddleware, usuarioRoutes);
app.use('/roles', authMiddleware, rolRoutes);

// Redirección por defecto
app.get('/', (req, res) => {
    res.redirect('/usuarios');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});