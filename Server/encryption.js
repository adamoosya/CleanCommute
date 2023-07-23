const crypto = require('crypto');

const generateSalt = () => {
  const salt = crypto.randomBytes(16).toString('hex');
  return salt;
};

const hashPassword = (password, salt) => {
    const hash = crypto
      .createHmac('sha256', salt)
      .update(password)
      .digest('hex');
    return hash;
};

const saltThenEncrypt = (password) => {
  const salt = generateSalt();
  const hash = hashPassword(password, salt);
  return { salt, hash };
}

module.exports.saltThenEncrypt = saltThenEncrypt;
module.exports.hashPassword = hashPassword;
