'use strict';

require('dotenv').config();
const getDB = require('./db');

async function main() {
  let connection;
  try {
    connection = await getDB();

    console.log(`Borrando las tablas...`);
    await connection.query(`DROP TABLE IF EXISTS suggestions_photos;`);
    await connection.query(`DROP TABLE IF EXISTS suggestions;`);
    await connection.query(`DROP TABLE IF EXISTS places_complaints;`);
    await connection.query(`DROP TABLE IF EXISTS places_photos;`);
    await connection.query(`DROP TABLE IF EXISTS places;`);
    await connection.query(`DROP TABLE IF EXISTS users_avatar;`);
    await connection.query(`DROP TABLE IF EXISTS users;`);

    console.log('Creando las tablas...');
    await connection.query(`
      CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(512) NOT NULL,
        avatar VARCHAR(50),
        active BOOLEAN DEFAULT false,
        role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
        registrationCode VARCHAR(100),
        deleted BOOLEAN DEFAULT false,
        lastAuthUpdate DATETIME,
        recoverCode VARCHAR(100)
      )
    `);

    await connection.query(`
      CREATE TABLE users_avatar (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        photo VARCHAR(100) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    await connection.query(`
      CREATE TABLE places (
        id INT PRIMARY KEY AUTO_INCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        distric VARCHAR(100) NOT NULL,
        problem_solved BOOLEAN DEFAULT false,
        place_id INT,
        FOREIGN KEY(place_id) REFERENCES places(id),
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await connection.query(`
      CREATE TABLE places_photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        photo VARCHAR(100),
        place_id INT,
        FOREIGN KEY(place_id) REFERENCES places(id)
      )
    `);

    await connection.query(`
      CREATE TABLE places_complaints (
        id INT PRIMARY KEY AUTO_INCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        complaint INT,
        place_id INT,
        FOREIGN KEY(place_id) REFERENCES places(id),
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
        -- CONSTRAINT uc_user_place UNIQUE (user_id , place_id)
      )
    `);

    await connection.query(`
      CREATE TABLE suggestions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        distric VARCHAR(100) NOT NULL,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    await connection.query(`
      CREATE TABLE suggestions_photos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        photo VARCHAR(100) NOT NULL,
        suggestion_id INT NOT NULL,
        FOREIGN KEY(suggestion_id) REFERENCES suggestions(id)
      )
    `);

    console.log('Creo usuario admin...');
    await connection.query(`
        INSERT INTO users(created_at, email, password, avatar, active, role)
        VALUES(
            CURRENT_TIMESTAMP,
            'albertoleandro37@gmail.com',
            SHA2("${process.env.ADMIN_PASSWORD}", 512),
            "Alberto Leandro",
            true,
            "admin"
        )
    `);
  } catch (error) {
    console.error('ERROR:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
    process.exit();
  }
}

main();
