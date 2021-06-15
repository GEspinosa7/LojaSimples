const express = require('express');
const { cadastrarUsuario } = require('./controllers/usuario');

const router = express();

router.post('/cadastro', cadastrarUsuario);

module.exports = router;