module.exports = function (data) {
  this.status(202).send({
    status: 202,
    message: "Update Success",
    data: data,
  });
};
