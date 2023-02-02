module.exports = function (data) {
  this.status(201).send({
    status: 201,
    message: "Created Successfully",
    data: data,
  });
};
