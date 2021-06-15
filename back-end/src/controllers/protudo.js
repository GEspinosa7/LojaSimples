const db = require("../connection");
const { validarCadastro, validarEdicao } = require('../validations/produto');

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
      if (rowCount === 0) return res.status(400).json({ Erro: 'Este produto não existe ou não pertence a sua loja' });

      const produto = rows[0];

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
   const { nome, estoque, categoria, preco, descricao, imagem } = req.body;

   const erro = validarEdicao(req.body);
   if (erro) return res.status(400).json({ erro: erro });

   const novosDados = {
      nome: '',
      estoque: '',
      categoria: '',
      preco: '',
      descricao: '',
      imagem: ''
   };

   try {
      const encontrarProduto = 'select * from produtos where id = $1 and usuario_id = $2';
      const produto = await db.query(encontrarProduto, [id, usuario.id]);
      if (produto.rowCount === 0) return res.status(400).json({ Erro: 'Este produto não existe ou não pertence a sua loja' });

      nome ? novosDados.nome = nome : novosDados.nome = produto.rows[0].nome;
      estoque ? novosDados.estoque = estoque : novosDados.estoque = produto.rows[0].estoque;
      categoria ? novosDados.categoria = categoria : novosDados.categoria = produto.rows[0].categoria;
      preco ? novosDados.preco = preco : novosDados.preco = produto.rows[0].preco;
      descricao ? novosDados.descricao = descricao : novosDados.descricao = produto.rows[0].descricao;
      imagem ? novosDados.imagem = imagem : novosDados.imagem = produto.rows[0].imagem;

      const atualizarProduto = `
         update produtos
         set 
         nome = $1,
         estoque = $2,
         categoria = $3,
         preco = $4,
         descricao = $5,
         imagem = $6
         where id = $7 and usuario_id = $8;
      `;

      const { rowCount } = await db.query(atualizarProduto,
         [
            novosDados.nome,
            novosDados.estoque,
            novosDados.categoria,
            novosDados.preco,
            novosDados.descricao,
            novosDados.imagem,
            id,
            usuario.id
         ]
      );
      if (rowCount === 0) return res.status(400).json({ Erro: 'Não foi possível atualizar os dados deste produto' });

      return res.status(200).json({ Sucesso: 'Produto cadastrado!' });
   } catch (error) {
      return res.status(400).json(error.message);
   }

};

const deletarProduto = async (req, res) => {
   const { usuario } = req;
   const { id } = req.params;

   try {
      const encontrarProduto = 'select * from produtos where id = $1 and usuario_id = $2';
      const produto = await db.query(encontrarProduto, [id, usuario.id]);
      if (produto.rowCount === 0) return res.status(400).json({ Erro: 'Este produto não existe ou não pertence a sua loja' });

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
