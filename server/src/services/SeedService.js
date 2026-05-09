const fs = require('fs');
const path = require('path');
const dbManager = require('../core/DatabaseManager');
const mysql = require('mysql2/promise');

class SeedService {
  constructor() {
    this.dbPath = path.join(__dirname, '../../db');
  }

  async run() {
    console.log('🚀 Starting Automated Seeding Process...');

    try {
      // 1. Create Master DB if it doesn't exist
      await this.ensureMasterDatabase();

      // 2. Run Master Schema
      console.log('📜 Running Master Schema...');
      await this.executeSqlFile('master-schema.sql', 'hotelia_master');

      // 3. Run Master Seeds
      console.log('🌱 Seeding Master Data...');
      await this.executeSqlFile('seed-master.sql', 'hotelia_master');

      // 4. Handle Tenant Databases
      const tenants = await dbManager.queryMaster('SELECT id, db_name FROM users');
      
      for (const tenant of tenants) {
        console.log(`🏢 Setting up Tenant DB: ${tenant.db_name} for User: ${tenant.id}`);
        await this.ensureTenantDatabase(tenant.db_name);
        await this.executeSqlFile('user-schema.sql', tenant.db_name);
        
        // Optional: Seed tenant-specific data if seed files exist
        const seedFile = `seed-user-1.sql`; // For demo, we use user-1 seed
        if (tenant.id === 'user-1' && fs.existsSync(path.join(this.dbPath, seedFile))) {
          await this.executeSqlFile(seedFile, tenant.db_name);
        }
      }

      console.log('✅ Seeding Completed Successfully!');
    } catch (error) {
      console.error('❌ Seeding Failed:', error.message);
      throw error;
    }
  }

  async ensureMasterDatabase() {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MASTER_DB_NAME || 'hotelia_master'}`);
    await connection.end();
  }

  async ensureTenantDatabase(dbName) {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.end();
  }

  async executeSqlFile(fileName, databaseName) {
    const filePath = path.join(this.dbPath, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Warning: SQL file not found: ${fileName}`);
      return;
    }

    const sql = fs.readFileSync(filePath, 'utf8');
    
    // Split by semicolon, but handle cases where it's inside quotes or comments if necessary
    // For simple scripts, splitting by ;\n or ;\r\n is usually enough
    const statements = sql
      .split(/;(?:\r?\n|$)/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: databaseName,
      multipleStatements: true
    });

    try {
      await connection.query('SET FOREIGN_KEY_CHECKS = 0');
      
      for (const statement of statements) {
        try {
          await connection.query(statement);
        } catch (err) {
          console.error(`  ❌ Error in statement: "${statement.substring(0, 50)}..."`);
          console.error(`     Reason: ${err.message}`);
        }
      }

      await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    } finally {
      await connection.end();
    }
  }
}

module.exports = new SeedService();
