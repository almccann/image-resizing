
module.exports = path => {
  const file = path.split('/').pop();
  return file.includes('.') ? file.split('.')[1].toLowerCase() : -1;
};
