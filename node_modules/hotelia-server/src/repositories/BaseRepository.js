const dbManager = require('../core/DatabaseManager');

class BaseRepository {
  constructor(tableName, isMaster = false) {
    this.tableName = tableName;
    this.isMaster = isMaster;
  }

  async findAll(tenantId = null) {
    const sql = `SELECT * FROM ${this.tableName}`;
    if (this.isMaster) {
      return await dbManager.queryMaster(sql);
    }
    return await dbManager.queryTenant(tenantId, sql);
  }

  async findById(id, tenantId = null) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const params = [id];
    if (this.isMaster) {
      const results = await dbManager.queryMaster(sql, params);
      return results[0] || null;
    }
    const results = await dbManager.queryTenant(tenantId, sql, params);
    return results[0] || null;
  }

  async create(data, tenantId = null) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;

    if (this.isMaster) {
      return await dbManager.queryMaster(sql, values);
    }
    return await dbManager.queryTenant(tenantId, sql, values);
  }

  async update(id, data, tenantId = null) {
    const keys = Object.keys(data);
    const values = [...Object.values(data), id];
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;

    if (this.isMaster) {
      return await dbManager.queryMaster(sql, values);
    }
    return await dbManager.queryTenant(tenantId, sql, values);
  }

  async delete(id, tenantId = null) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const params = [id];
    if (this.isMaster) {
      return await dbManager.queryMaster(sql, params);
    }
    return await dbManager.queryTenant(tenantId, sql, params);
  }
}

module.exports = BaseRepository;
