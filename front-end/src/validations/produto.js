const validateCadastro = ({ nome, preco, estoque, descricao }) => {
   if (!nome) return 'O campo nome é obrigatório.';

   if (!preco) return 'O campo preco é obrigatório.';

   if (!estoque) return 'O campo estoque é obrigatório.';

   if (!descricao) return 'O campo descricao é obrigatório.';
};

export default validateCadastro;