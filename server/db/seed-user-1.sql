CREATE DATABASE IF NOT EXISTS user_1_db;
USE user_1_db;

CREATE TABLE IF NOT EXISTS hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  cuisine VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  sector VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE TABLE hotels;
INSERT INTO hotels (name, city) VALUES
  ('Greenleaf Suites', 'Austin'),
  ('The Moss Retreat', 'Seattle');

TRUNCATE TABLE restaurants;
INSERT INTO restaurants (name, cuisine) VALUES
  ('Verdant Table', 'Farm-to-Table'),
  ('Emerald Grill', 'Modern American');

TRUNCATE TABLE companies;
INSERT INTO companies (name, sector) VALUES
  ('Lush Lodging Inc.', 'Hospitality'),
  ('Forest & Co. Logistics', 'Supply Chain');
