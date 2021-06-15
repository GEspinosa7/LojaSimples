const express = require('express');
const { login } = require('./controllers/login');
const { cadastrarUsuario } = require('./controllers/usuario');

const router = express();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', login);

module.exports = router;