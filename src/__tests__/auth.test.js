const request = require("supertest");
const app = require("../app");

describe("AUTH", () => {
  const testUser = {
    email: "test.jest@gmail.com",
    password: "123456",
    firstName: "Jest",
    lastName: "Test",
    phone: "0601020304"
  };

  describe("POST /api/auth/register", () => {
    it("doit créer un utilisateur", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      expect(res.status).toBe(201);
      expect(res.body.user.email).toBe(testUser.email);
    });

    it("doit refuser un email déjà utilisé", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send(testUser);
      expect(res.status).toBe(400);
    });

    it("doit refuser un email invalide", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...testUser, email: "pasunemail" });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].champ).toBe("email");
    });

    it("doit refuser un mot de passe trop court", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ ...testUser, email: "autre@gmail.com", password: "123" });
      expect(res.status).toBe(400);
      expect(res.body.errors[0].champ).toBe("password");
    });
  });

  describe("POST /api/auth/login", () => {
    it("doit connecter un utilisateur", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password });
      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });

    it("doit refuser un mauvais mot de passe", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "mauvais" });
      expect(res.status).toBe(401);
    });

    it("doit refuser un utilisateur inexistant", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "inexistant@gmail.com", password: "123456" });
      expect(res.status).toBe(401);
    });
  });
});
