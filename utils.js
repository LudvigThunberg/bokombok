const bcrypt = require("bcrypt");

const getUniqueFileName = (fileName) => {
  const timestamp = Date.now();
  const extention = fileName.split(".").pop();
  return `${timestamp}.${extention}`;
};

const hashPassword = (password) => {
  const hashValue = bcrypt.hashSync(password, 12);
  return hashValue;
};

const comparePassword = (password, hash) => {
  const correct = bcrypt.compareSync(password, hash);
  return correct;
};

module.exports = {
  getUniqueFileName,
  hashPassword,
  comparePassword,
};
