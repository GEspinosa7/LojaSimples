const db = require("../connection");

const listarProdutos = async (req, res) => {
   const { usuario } = req;
   const { categoria } = req.query;

   try {
      let produtos;
      if (categoria) {
         const encontrarProdutos = 'select * from produtos where usuario_id = $1 and categoria = $2';
         produtos = await db.query(encontrarProdutos, [usuario.id, categoria]);
      } else {
         const encontrarProdutos = 'select * from produtos where usuario_id = $1';
         produtos = await db.query(encontrarProdutos, [usuario.id]);
      }

      return res.status(200).json(produtos.rows);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const obterProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   try {
      const encontrarProduto = 'select * from produtos where id = $1 and usuario_id = $2';
      const { rows, rowCount } = await db.query(encontrarProduto, [id, usuario.id]);
      if (rowCount === 0) return res.status(400).json({ erro: 'Este produto não existe ou não pertence a sua loja' });

      const produto = rows[0];

      return res.status(200).json(produto);
   } catch (error) {
      return res.status(400).json(error.message);
   }
};

const cadastrarProduto = async (req, res) => { };

const editarProduto = async (req, res) => { };

const deletarProduto = async (req, res) => { };



module.exports = {
   listarProdutos,
   obterProduto,
   cadastrarProduto,
   editarProduto,
   deletarProduto
}
