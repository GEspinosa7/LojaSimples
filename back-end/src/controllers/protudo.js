const db = require("../connection");
const { validarCadastro, validarEdicao } = require('../validations/produto');
const { filtrarProdutos, updateProdutos, encontrarProduto } = require('../intermediaries/produto');

const listarProdutos = async (req, res) => {
   const { usuario } = req;
   const { categoria, preco } = req.query;

   try {
      const filtro = filtrarProdutos({ categoria, preco }, 1, [], [usuario.id]);

      let encontrarProdutos = `select * from produtos where usuario_id = $1${filtro.values.join("")}`;
      const { rows } = await db.query(encontrarProdutos, filtro.queryParams);
      const produtos = rows;

      return res.status(200).json(produtos);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const obterProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   try {
      const produto = await encontrarProduto(id, usuario.id);
      if (typeof produto === 'string') return res.status(400).json({ Erro: produto });

      return res.status(200).json(produto);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const cadastrarProduto = async (req, res) => {
   const { usuario } = req;
   const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

   const erro = validarCadastro(req.body);
   if (erro) return res.status(400).json({ Erro: erro });

   try {
      const criarProduto = `
         insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem)
         values ($1, $2, $3, $4, $5, $6, $7);
      `;
      const { rowCount } = await db.query(criarProduto, [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);
      if (rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível cadastrar este produto' });

      return res.status(200).json({ Sucesso: 'Produto cadastrado!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const editarProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   const erro = validarEdicao(req.body);
   if (erro) return res.status(400).json({ Erro: erro });

   try {
      const produto = await encontrarProduto(id, usuario.id);
      if (typeof produto === 'string') return res.status(400).json({ Erro: produto });

      const queryParametros = [];
      const query = updateProdutos(req.body, 0, [], queryParametros);
      queryParametros.push(id);
      queryParametros.push(usuario.id);

      const atualizarProduto = `update produtos set ${query.values} where id = $${query.values.length + 1} and usuario_id = $${query.values.length + 2}`;
      const { rowCount } = await db.query(atualizarProduto, queryParametros);
      if (rowCount === 0) return res.status(400).json(atualizarProduto);

      return res.status(200).json({ Sucesso: 'Produto atualizado!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const deletarProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   try {
      const produto = await encontrarProduto(id, usuario.id);
      if (typeof produto === 'string') return res.status(400).json({ Erro: produto });

      const apagarProduto = 'delete from produtos where id = $1  and usuario_id = $2';
      const { rowCount } = await db.query(apagarProduto, [id, usuario.id]);
      if (rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível apagar este produto' });

      return res.status(200).json({ Sucesso: 'Produto apagado!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

module.exports = {
   listarProdutos,
   obterProduto,
   cadastrarProduto,
   editarProduto,
   deletarProduto
}
