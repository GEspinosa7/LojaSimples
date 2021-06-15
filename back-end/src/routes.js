const express = require('express');
const { login } = require('./controllers/login');
const { cadastrarUsuario, mostrarPerfil, editarPerfil } = require('./controllers/usuario');
const loginAuth = require('./filters/login_auth');

const router = express();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', login);

router.use(loginAuth);

router.get('/perfil', mostrarPerfil);
router.put('/perfil', editarPerfil);

module.exports = router;