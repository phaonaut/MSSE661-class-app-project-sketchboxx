const CREATE_SKETCHES_TABLE = `
  CREATE TABLE IF NOT EXISTS sketches (
    sketch_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    sketch JSON NOT NULL,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
  );
`;

const GET_ALL_SKETCHES = `SELECT * FROM sketches WHERE user_id = ?`;

const INSERT_SKETCH  = `INSERT INTO sketches (sketch_id, user_id, name, sketch, create_time) VALUES (null, ?, ?, ?, DEFAULT)`;

export default {CREATE_SKETCHES_TABLE, GET_ALL_SKETCHES, INSERT_SKETCH};