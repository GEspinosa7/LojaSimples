const db = require('../connection');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const loginAuth = async (req, res, next) => {
   const { authorization } = req.headers;
   if (!authorization) return res.status(400).json({ erro: 'Token não informado' });

   try {
      const token = authorization.replace('Bearer', '').trim();

      const { id } = jwt.verify(token, jwtSecret);
      const econtraUsuario = 'select * from usuarios where id = $1';
      const { rows, rowCount } = await db.query(econtraUsuario, [id]);
      if (rowCount === 0) return res.status(404).json({ erro: 'Usuário nao encontrado' });

      const { senha: senhaUsuario, ...dadosUsuario } = rows[0];

      req.usuario = dadosUsuario;

      next();
   } catch (error) {
      return res.status(404).json(error.message);
   }
};

module.exports = loginAuth;