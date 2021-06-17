const db = require('../connection');
const bcrypt = require("bcrypt");
const { validarCadastro, validarEdicao } = require('../validations/usuario');
const { updateUsuario } = require('../intermediaries/usuario');

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

      return res.status(200).json({ sucesso: 'Usuário cadastrado com sucesso!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const mostrarPerfil = async (req, res) => {
   const { usuario } = req;

   try {
      const encontrarUsuario = 'select id, nome, email, nome_loja from usuarios where id = $1';
      const { rows } = await db.query(encontrarUsuario, [usuario.id]);

      const perfil = rows[0];

      return res.status(200).json(perfil);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const editarPerfil = async (req, res) => {
   const { usuario } = req;
   const { email } = req.body;

   const erro = validarEdicao(req.body);
   if (erro) return res.status(400).json({ erro: erro });

   try {
      const encontrarEmail = 'select * from usuarios where email = $1';
      const { rowCount } = await db.query(encontrarEmail, [email]);
      if (rowCount > 0) return res.status(400).json({ erro: 'Este email não pode ser escolhido pois ja está cadastrado' });

      const queryParametros = [];
      const query = await updateUsuario(req.body, 0, [], queryParametros);
      queryParametros.push(usuario.id);

      const novosDadosUsuario = `update usuarios set${query.values} where id = $${query.values.length + 1}`;
      const usuarioAtualizado = await db.query(novosDadosUsuario, queryParametros);
      if (usuarioAtualizado.rowCount === 0) return res.status(400).json({ erro: 'Não foi possível atualizar os dados do usuário' });

      return res.status(200).json({ sucesso: 'Usuário atualizado com sucesso!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

module.exports = {
   cadastrarUsuario,
   mostrarPerfil,
   editarPerfil
}