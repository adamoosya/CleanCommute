const { insertUserEntry } = require('./database'); // Assuming the refactored code is in a file named "database.js"
const encryption = require('./encryption');
const saltThenEncrypt = encryption.saltThenEncrypt;

function registerUser(username, password, callback) {
    const test = saltThenEncrypt(password);
  
    // Define the entry to be inserted
    const entry = {
      username: username,
      salt: test.salt,
      encrypted_password: test.hash,
    };
  
    // Call the insertUserEntry function to insert the entry into the users table
    insertUserEntry(entry, (error, results) => {
      if (error) {
        console.error('Error:', error);
        callback(error);
      } else {
        console.log('Results:', results);
        callback(null, results.insertId); // Pass the inserted user's ID to the callback
      }
    });
  }
  
  module.exports = {
    registerUser,
  };
