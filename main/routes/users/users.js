const Route = require("../../../start/core/Route/route");
const route = new Route("main/users");

route.group(() => {
  route
    .post("/user/login", "UserController.login")
    .middleware(["Validator|login"]);

  route.get("/users", "UserController.viewUsers").middleware(["Authorization"]);

  route
    .post("/user/create", "UserController.create")
    .middleware(["Authorization", "Validator|user"]);

  route
    .patch("/user/edit/:id", "UserController.editUser")
    .middleware(["Authorization"]);

  route
    .delete("/user/delete/:id", "UserController.deleteUser")
    .middleware(["Authorization"]);

  route
    .delete("/users/delete", "UserController.deleteUsers")
    .middleware(["Authorization"]);
});
