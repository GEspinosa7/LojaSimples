const express = require('express');
const { login } = require('./controllers/login');
const { cadastrarUsuario } = require('./controllers/usuario');
const loginAuth = require('./filters/login_auth');

const router = express();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', login);

router.use(loginAuth);

module.exports = router;