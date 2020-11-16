module.exports.delay = length =>
  new Promise(resolve => setTimeout(resolve, length));
