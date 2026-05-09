const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const masterPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.MASTER_DB_NAME || 'hotelia_master',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const userPools = new Map();

async function masterQuery(sql, params = []) {
  const [rows] = await masterPool.execute(sql, params);
  return rows;
}

async function getUserConfig(userId) {
  const users = await masterQuery(
    'SELECT id, name, db_host, db_name, db_user, db_password FROM users WHERE id = ?',
    [userId]
  );
  return users[0] || null;
}

async function getUserPool(userId) {
  if (userPools.has(userId)) {
    return userPools.get(userId);
  }

  const userConfig = await getUserConfig(userId);
  if (!userConfig) {
    throw new Error('User not found');
  }

  const pool = mysql.createPool({
    host: userConfig.db_host || process.env.DB_HOST || 'localhost',
    user: userConfig.db_user || process.env.DB_USER || 'root',
    password: userConfig.db_password || process.env.DB_PASSWORD || '',
    database: userConfig.db_name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  userPools.set(userId, pool);
  return pool;
}

async function queryForUser(userId, sql, params = []) {
  const pool = await getUserPool(userId);
  const [rows] = await pool.execute(sql, params);
  return rows;
}

module.exports = {
  masterQuery,
  queryForUser
};
