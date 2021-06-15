const express = require('express');
const { login } = require('./controllers/login');
const { cadastrarUsuario, mostrarPerfil } = require('./controllers/usuario');
const loginAuth = require('./filters/login_auth');

const router = express();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', login);

router.use(loginAuth);

router.get('/perfil', mostrarPerfil);

module.exports = router;