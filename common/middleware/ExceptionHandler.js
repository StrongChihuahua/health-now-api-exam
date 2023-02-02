const GeneralError = require("../exceptions/GeneralError");

const handleErrors = (err, res) => {
  console.error(err);
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: `Error: ${err.errorName}`,
      statusCode: err.getCode(),
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error: Internal Server Error",
    statusCode: 500,
    message: err.msg,
  });
};

module.exports = handleErrors;
