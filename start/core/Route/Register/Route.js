module.exports = (args) => {
  const { router, path, controller, namespace, method } = args;
  const [_controller, _method] = controller.split(".");
  console.log(
    `REGISTER_ROUTE====${namespace}/controllers/${_controller} ${_method}`
  );
  router[method](
    path,
    require(`../../../../${namespace}/controllers/${_controller}`)[_method]
  );
};
