module.exports = (args) => {
  const { middlewares, method, router, path } = args;

  if (middlewares.length) {
    for (const middleware of middlewares) {
      const [type, sub_type] = middleware.split("|");
      router[method](
        path,
        require(`../../../../common/middleware/${
          sub_type ? `${type}/${sub_type}` : type
        }`)
      );
    }
  }
};
