const supertest = require("supertest");
const request = supertest("http://localhost:4101/api");

const { v4 } = require("uuid");

let token = "";
let created_user_id = null;

//* Login Endpoints
describe("Happy Path Test", () => {
  //* Login User
  describe("POST /user/login", () => {
    it("Valid Login User (ADMIN) - STATUS 200", async () => {
      const res = await request
        .post("/user/login")
        .send({
          username: "admin",
          password: "admin",
        })
        .expect(200);

      token = res.body.data.access_token;
    });

    it("Invalid Login User - STATUS 401", async () => {
      await request
        .post("/user/login")
        .send({
          username: "invalid",
          password: "invalid",
        })
        .expect(401);
    });
  });

  //* Create Valid User
  describe("POST /user/create", () => {
    it("Add Valid New User - STATUS 201", async () => {
      const res = await request
        .post("/user/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          first_name: "dummy",
          last_name: "dummy",
          address: "dummy",
          post_code: "dummy",
          contact_number: "dummy",
          email: "dummy",
          username: v4(),
          password: "dummy",
          admin: false,
        })
        .expect(201);

      created_user_id = res.body.data.id;
    });
  });
});

//* Protected Endpoints
describe("Admin Endpoints", () => {
  describe("GET /users", () => {
    it("View ALL USERS - STATUS 200", async () => {
      await request
        .get("/users")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
  });

  //* Add New User
  describe("POST /user/create", () => {
    it("Add New User (Missing Field - first_name) - STATUS 400", async () => {
      await request
        .post("/user/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          last_name: "dummy",
          address: "dummy",
          post_code: "dummy",
          contact_number: "dummy",
          email: "dummy",
          username: "dummy",
          password: "dummy",
          admin: true,
        })
        .expect(400);
    });

    it("Add New User (username already existing)- STATUS 400", async () => {
      await request
        .post("/user/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          first_name: "dummy",
          last_name: "dummy",
          address: "dummy",
          post_code: "dummy",
          contact_number: "dummy",
          email: "dummy",
          username: "admin",
          password: "dummy",
          admin: false,
        })
        .expect(400);
    });
  });

  //* Edit User
  describe("PATCH /user/edit/:id", () => {
    it("Edit User with ID = 10 - STATUS 202", async () => {
      await request
        .patch(`/user/edit/${created_user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          contact_number: "123123",
          email: "dummy@yahoo.com",
        })
        .expect(202);
    });

    it("Edit User with ID = na (not existing) - STATUS 404", async () => {
      await request
        .patch("/user/edit/na")
        .set("Authorization", `Bearer ${token}`)
        .send({
          contact_number: "123123",
          email: "dummy@yahoo.com",
        })
        .expect(404);
    });
  });

  //* Delete User
  describe("DELETE /user/delete/:id", () => {
    it("Delete User with ID = 5 - STATUS 202", async () => {
      await request
        .delete(`/user/delete/${created_user_id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(202);
    });

    it("Delete User with ID = na (not existing) - STATUS 404", async () => {
      await request
        .delete("/user/delete/na")
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });
  });

  //* Multiple Delete Users
  describe("DELETE /users/delete", () => {
    it("Delete Multiple Users in [created_user_id] - STATUS 202", async () => {
      await request
        .delete("/users/delete")
        .set("Authorization", `Bearer ${token}`)
        .send({ users: [created_user_id - 1] })
        .expect(202);
    });

    it("Delete Multiple Users in [] = emtpy - STATUS 404", async () => {
      await request
        .delete("/users/delete")
        .set("Authorization", `Bearer ${token}`)
        .send({ users: [] })
        .expect(400);
    });
  });
});
