const validarCadastro = ({ nome, nome_loja, email, senha }) => {
   if (!nome || nome === '') return 'Campo nome é obrigatório';
   if (!nome_loja || nome_loja === '') return 'Campo nome_loja é obrigatório';
   if (!email || email === '') return 'Campo email é obrigatório';
   if (!senha || senha === '') return 'Campo senha é obrigatório';
}

module.exports = { validarCadastro };