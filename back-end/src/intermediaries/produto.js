const filtrarProdutos = ({ categoria, preco }, count, values, queryParams) => {
   if (categoria) {
      count++;
      values.push(` and categoria = $${count}`);
      queryParams.push(categoria);
   }

   if (preco) {
      count++;
      values.push(` and preco >= $${count}`);
      queryParams.push(preco);
   }
   return { values, queryParams };
};

const updateProdutos = ({ nome, estoque, categoria, preco, descricao, imagem }, count, values, queryParams) => {
   if (nome) {
      count++;
      values.push(` nome = $${count}`);
      queryParams.push(nome);
   }
   if (estoque) {
      count++;
      values.push(` estoque = $${count}`);
      queryParams.push(estoque);
   }
   if (categoria) {
      count++;
      values.push(` categoria = $${count}`);
      queryParams.push(categoria);
   }
   if (preco) {
      count++;
      values.push(` preco = $${count}`);
      queryParams.push(preco);
   }
   if (descricao) {
      count++;
      values.push(` descricao = $${count}`);
      queryParams.push(descricao);
   }
   if (imagem) {
      count++;
      values.push(` imagem = $${count}`);
      queryParams.push(imagem);
   }
   return { values, queryParams };
};

module.exports = { filtrarProdutos, updateProdutos };