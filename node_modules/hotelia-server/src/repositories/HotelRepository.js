const BaseRepository = require('./BaseRepository');
const dbManager = require('../core/DatabaseManager');

class HotelRepository extends BaseRepository {
  constructor() {
    super('hotels', false); // Hotels are in tenant-specific DBs
  }

  async findByCity(tenantId, city) {
    const sql = `SELECT * FROM ${this.tableName} WHERE city = ?`;
    return await dbManager.queryTenant(tenantId, sql, [city]);
  }
}

module.exports = new HotelRepository();
