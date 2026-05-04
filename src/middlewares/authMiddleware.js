module.exports = (req, res, next) => {
    // Si existe una sesión activa, lo dejamos pasar a la siguiente ruta
    if (req.session && req.session.usuario) {
        return next();
    }
    // Si no tiene sesión, lo redirigimos al login
    res.redirect('/login');
};