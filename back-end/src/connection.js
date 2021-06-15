const { Pool } = require('pg');

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'market_cubos',
   password: '123456',
   port: 5432
});

const query = (queryText, params) => {
   return pool.query(queryText, params);
}

module.exports = { query };