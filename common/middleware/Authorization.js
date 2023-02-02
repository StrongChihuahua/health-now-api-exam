const FactoryException = require("../exceptions/FactoryException");

const jwt = require("jsonwebtoken");

// jwt_secret_key
const jwtSecretKey = process.env.jwt_secret_key;

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      throw FactoryException("Unauthorized", "Unauthorized access");

    const [bearer, token] = authorization.split("Bearer ");

    if (bearer !== "")
      throw FactoryException("Unauthorized", "Unauthorized access");

    // verify token if valid
    const payload = jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) throw FactoryException("Unauthorized", "Invalid Token");
      return decoded;
    });

    req.user_payload = payload;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};
