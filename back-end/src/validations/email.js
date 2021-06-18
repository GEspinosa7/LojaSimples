const db = require('../connection');

const validarEmail = async (email) => {
   const { rowCount } = await db.query('select * from usuarios where email = $1', [email]);
   if (rowCount > 0) return 'Este email ja está cadastrado';
};

module.exports = validarEmail;