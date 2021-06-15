const db = require('../connection');
const bcrypt = require("bcrypt");
const { validarCadastro } = require('../validations/usuario');

const cadastrarUsuario = async (req, res) => {
   const { nome, nome_loja, email, senha } = req.body;

   const erro = validarCadastro(req.body);
   if (erro) return res.status(400).json({ erro: erro });

   try {
      const encontrarEmail = 'select * from usuarios where email = $1';
      const { rowCount } = await db.query(encontrarEmail, [email]);
      if (rowCount > 0) return res.status(400).json({ erro: 'Este email ja está cadastrado' });

      const cryptSenha = await bcrypt.hash(senha, 10);
      const criarUsuario = 'insert into usuarios (nome, nome_loja, email, senha) values ($1, $2, $3, $4)';
      const usuario = await db.query(criarUsuario, [nome, nome_loja, email, cryptSenha]);
      if (usuario.rowCount === 0) return res.status(400).json({ erro: 'Não foi possível cadastrar o usuário' });

      return res.status(200).json({ sucesso: 'Uusuário cadastrado com sucesso!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }

};

const mostrarPerfil = async (req, res) => {

};

const editarPerfil = async (req, res) => {

};

module.exports = {
   cadastrarUsuario,
   mostrarPerfil,
   editarPerfil
}