const { getUserByUsername } = require('./database');
const encryption = require('./encryption');
const hashPassword = encryption.hashPassword;

function checkUserCredentials(username, password, callback) {
  getUserByUsername(username, (error, user) => {
    if (error) {
      console.error('Error:', error);
      callback(error, false);
    } else {
      if (user) {
        // User found, compare the provided password with the stored encrypted password
        const isValidPassword = hashPassword(password, user.salt) === user.encrypted_password;
        callback(null, isValidPassword);
      } else {
        // User not found
        callback(null, false);
      }
    }
  });
}

module.exports = {
  checkUserCredentials,
};
