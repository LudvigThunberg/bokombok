const getUniqueFileName = (fileName) => {
  const timestamp = Date.now();
  const extention = fileName.split(".").pop();
  return `${timestamp}.${extention}`;
};

module.exports = {
  getUniqueFileName,
};
