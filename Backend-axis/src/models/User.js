const pool = require('../config/db');

const createUser = async ({ name, email, password, role }) => {
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  return new Promise((resolve, reject) => {
    pool.query(query, [name, email, password, role], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  return new Promise((resolve, reject) => {
    pool.query(query, [email], (error, results) => {
      if (error) return reject(error);
      resolve(results[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
