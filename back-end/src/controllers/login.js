const db = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');
const { validarLogin } = require("../validations/login");

const login = async (req, res) => {
   const { email, senha } = req.body;

   const erro = validarLogin(req.body);
   if (erro) return res.status(400).json({ erro: erro });

   try {
      const encontrarUsuario = 'select * from usuarios where email = $1';
      const { rows, rowCount } = await db.query(encontrarUsuario, [email]);
      if (rowCount === 0) return res.status(400).json({ erro: 'Email ou senha inválidos' });

      const usuario = rows[0];
      const bcryptSenha = await bcrypt.compare(senha, usuario.senha);
      if (!bcryptSenha) return res.status(400).json({ erro: 'Email ou senha inválidos' });

      const { senha: senhaUsuario, ...dadosUsuraio } = usuario;

      const token = jwt.sign({ id: usuario.id }, jwtSecret,);

      return res.status(200).json({ usuario: dadosUsuraio, token });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};


module.exports = { login };