module.exports = (args) => {
  let { value, error = {} } = args;

  let _errors;

  error = error || {};

  if (error.details) {
    _errors = {};
    for (const e of error.details) {
      const [field] = e.path;
      const message = e.message;
      _errors[field] = message;
    }
  }

  return { value, error: _errors };
};
