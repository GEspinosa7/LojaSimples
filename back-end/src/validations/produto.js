const validarCadastro = ({ nome, estoque, preco, descricao }) => {
   if (!nome || nome === '') return 'Campo nome é obrigatório';
   if (!estoque || estoque === '') return 'Campo estoque é obrigatório';
   if (!preco || preco === '') return 'Campo preco é obrigatório';
   if (!descricao || descricao === '') return 'Campo descricao é obrigatório';
}


module.exports = { validarCadastro };