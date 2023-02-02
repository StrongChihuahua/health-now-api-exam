module.exports = function (data) {
  this.status(202).send({
    status: 202,
    message: "Deletion Success",
    data: data,
  });
};
