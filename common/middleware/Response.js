const ResponseService = require("../services/Response");

module.exports = (req, res, next) => {
  const { apiSuccess, apiCreated, apiDeleted, apiFailed, apiUpdated } =
    ResponseService;

  res.apiSuccess = apiSuccess;
  res.apiCreated = apiCreated;
  res.apiDeleted = apiDeleted;
  res.apiFailed = apiFailed;
  res.apiUpdated = apiUpdated;
  next();
};
