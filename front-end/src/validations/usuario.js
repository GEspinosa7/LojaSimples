const validateCadastro = ({
   senha,
   senhaVerified,
   nome,
   nome_loja,
   email,
}) => {
   if (!nome) return 'O campo nome é obrigatório.';

   if (!nome_loja) return 'O campo nome da loja é obrigatório.';

   if (!email) return 'O campo email é obrigatório.';

   if (!senha) return 'O campo senha é obrigatório.';

   if (senha !== senhaVerified) return 'As senhas devem ser iguais.';
}

const validateLogin = ({ email, senha }) => {
   if (!senha) {
      return 'O campo senha é obrigatório.'
   }
   if (!email) {
      return 'O campo email é obrigatório.'
   }
};

const validateEdicao = ({ novaSenha, novaSenhaVerified }) => {
   if (novaSenha !== novaSenhaVerified) return 'As senhas devem ser iguais.';
};

export {
   validateCadastro,
   validateLogin,
   validateEdicao
}