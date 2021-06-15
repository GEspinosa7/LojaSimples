const db = require('../connection');
const bcrypt = require("bcrypt");
const { validarCadastro, validarEdicao } = require('../validations/usuario');

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
   const { nome, email, senha, nome_loja } = req.body;

   const erro = validarEdicao(req.body);
   if (erro) return res.status(400).json({ erro: erro });

   const novosDados = {
      nome: '',
      email: '',
      senha: '',
      nome_loja: ''
   };

   try {
      nome ? novosDados.nome = nome : novosDados.nome = usuario.nome;
      nome_loja ? novosDados.nome_loja = nome_loja : novosDados.nome_loja = usuario.nome_loja;

      if (email) {
         const encontrarEmail = 'select * from usuarios where email = $1';
         const { rows, rowCount } = await db.query(encontrarEmail, [email]);
         if (rowCount > 0) return res.status(400).json({ erro: 'Este email não pode ser escolhido pois ja está cadastrado' });

         novosDados.email = email;
      } else {
         novosDados.email = usuario.email;
      }

      if (senha) {
         const cryptSenha = await bcrypt.hash(senha, 10);
         novosDados.senha = cryptSenha;

         const editarUsuario = `
            update usuarios 
            set
            nome = $1,
            email = $2,
            senha = $3,
            nome_loja = $4
            where id = $5;
         `;

         const { rowCount } = await db.query(editarUsuario, [novosDados.nome, novosDados.email, novosDados.senha, novosDados.nome_loja, usuario.id]);
         if (rowCount === 0) return res.status(400).json({ erro: 'Não foi possível atualizar os dados do usuário' });

         return res.status(200).json({ sucesso: 'Usuário atualizado com sucesso!' });
      }

      const editarUsuario = `
         update usuarios 
         set
         nome = $1,
         email = $2,
         nome_loja = $3
         where id = $4;
      `;

      const { rowCount } = await db.query(editarUsuario, [novosDados.nome, novosDados.email, novosDados.nome_loja, usuario.id]);
      if (rowCount === 0) return res.status(400).json({ erro: 'Não foi possível atualizar os dados do usuário' });

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