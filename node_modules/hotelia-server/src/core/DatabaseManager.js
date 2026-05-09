const mysql = require('mysql2/promise');

class DatabaseManager {
  constructor() {
    if (DatabaseManager.instance) {
      return DatabaseManager.instance;
    }

    this.masterPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.MASTER_DB_NAME || 'hotelia_master',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    this.tenantPools = new Map();
    DatabaseManager.instance = this;
  }

  async queryMaster(sql, params = []) {
    const [rows] = await this.masterPool.execute(sql, params);
    return rows;
  }

  async getTenantConfig(tenantId) {
    const results = await this.queryMaster(
      'SELECT id, db_host, db_name, db_user, db_password FROM users WHERE id = ?',
      [tenantId]
    );
    return results[0] || null;
  }

  async getTenantPool(tenantId) {
    if (this.tenantPools.has(tenantId)) {
      return this.tenantPools.get(tenantId);
    }

    const config = await this.getTenantConfig(tenantId);
    if (!config) {
      throw new Error(`Tenant config not found for ID: ${tenantId}`);
    }

    const pool = mysql.createPool({
      host: config.db_host || process.env.DB_HOST || 'localhost',
      user: config.db_user || process.env.DB_USER || 'root',
      password: config.db_password || process.env.DB_PASSWORD || '',
      database: config.db_name,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    this.tenantPools.set(tenantId, pool);
    return pool;
  }

  async queryTenant(tenantId, sql, params = []) {
    const pool = await this.getTenantPool(tenantId);
    const [rows] = await pool.execute(sql, params);
    return rows;
  }
}

const instance = new DatabaseManager();
Object.freeze(instance);

module.exports = instance;
