module.exports = function (data) {
  this.status(200).send({
    status: 200,
    message: "Success",
    data: data,
  });
};
