const mysql = require('mysql2');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Krepsly1$',
  database: 'mydatabase',
  connectionLimit: 10, // Adjust the connection limit as needed
});

// Define a function to insert an entry into the users table
function insertUserEntry(entry, callback) {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error('Error connecting to the database:', error);
        callback(error);
        return;
      }
  
      // Prepare the SQL statement to check for existing username
      const checkSql = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
      const checkValues = [entry.username];
  
      // Execute the query to check for existing username
      connection.query(checkSql, checkValues, (error, results) => {
        if (error) {
          console.error('Error checking for existing username:', error);
          connection.release();
          callback(error);
          return;
        }
  
        const count = results[0].count;
  
        if (count > 0) {
          console.error('Username already exists.');
          connection.release();
          callback(new Error('Username already exists.'));
          return;
        }
  
        // Prepare the SQL statement with placeholders
        const insertSql = 'INSERT INTO users (username, salt, encrypted_password) VALUES (?, ?, ?)';
        const insertValues = [entry.username, entry.salt, entry.encrypted_password];
  
        // Execute the prepared statement with the sanitized values
        connection.query(insertSql, insertValues, (error, results) => {
          connection.release(); // Release the connection back to the pool
  
          if (error) {
            console.error('Error inserting entry:', error);
            callback(error);
          } else {
            console.log('Entry inserted successfully.');
            callback(null, results);
          }
        });
      });
    });
  }
  

function getUserByUsername(username, callback) {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error('Error connecting to the database:', error);
        callback(error);
        return;
      }
  
      // Prepare the SQL statement with placeholders
      const sql = 'SELECT * FROM users WHERE username = ?';
      const values = [username];
  
      // Execute the prepared statement with the sanitized values
      connection.query(sql, values, (error, results) => {
        connection.release(); // Release the connection back to the pool
  
        if (error) {
          console.error('Error retrieving user:', error);
          callback(error);
        } else {
          if (results.length > 0) {
            // User found, pass the user information to the callback
            callback(null, results[0]);
          } else {
            // User not found
            callback(null, null);
          }
        }
      });
    });
  }
  
  
// Export the insertUserEntry function to make it accessible from other modules
module.exports = {
    insertUserEntry,
    getUserByUsername,
};
