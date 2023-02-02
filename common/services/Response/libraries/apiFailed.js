module.exports = function (message) {
  this.status(400).send({
    status: 400,
    message: `Bad Request: ${message}`,
    data: null,
  });
};
