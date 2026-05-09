-- Master schema for Hotelia SaaS user database
-- This database stores user records and their associated database settings.

CREATE DATABASE IF NOT EXISTS hotelia_master;
USE hotelia_master;

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  db_host VARCHAR(150) DEFAULT 'localhost',
  db_name VARCHAR(150) NOT NULL,
  db_user VARCHAR(150) DEFAULT 'root',
  db_password VARCHAR(150) DEFAULT '',
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  token TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
