const bcrypt = require("bcrypt");

const updateUsuario = async ({ nome, email, senha, nome_loja }, count, values, queryParams) => {
   if (nome) {
      count++;
      values.push(` nome = $${count}`);
      queryParams.push(nome);
   }
   if (email) {
      count++;
      values.push(` email = $${count}`);
      queryParams.push(email);
   }
   if (senha) {
      count++;
      values.push(` senha = $${count}`);
      const cryptSenha = await bcrypt.hash(senha, 10);
      queryParams.push(cryptSenha);
   }
   if (nome_loja) {
      count++;
      values.push(` nome_loja = $${count}`);
      queryParams.push(nome_loja);
   }

   return { values, queryParams };
};

module.exports = { updateUsuario };