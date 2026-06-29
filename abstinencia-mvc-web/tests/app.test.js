const request = require("supertest");
const app = require("../src/app");

describe("app routes", () => {
  test("GET / redirige a login si no hay sesion", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe("/login");
  });

  test("GET /login responde 200", async () => {
    const res = await request(app).get("/login");
    expect(res.statusCode).toBe(200);
  });
});
