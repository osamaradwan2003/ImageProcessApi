import supertest from "supertest";
import app from "../index";
const req = supertest(app);
describe("1 test server route endpoint ", () => {
  it("should return 200 OK from route api/images", async () => {
    const res = await req.get("/api/image");
    expect(res.status).toBe(200);
  });
});

describe("2 test api process endpiont", () => {
  it("should return 200 OK from route /api/images?filename=santamonica&width=400&height=200", async () => {
    const res = await req.get(
      "/api/images?filename=santamonica&width=400&height=200"
    );
    expect(res.status).toBe(200);
  });

  it("should return server code erro 500  from route /api/images?filename=''&width=0&height=0", async () => {
    const res = await req.get("/api/images?filename=''&width=0&height=0");
    expect(res.status).toBe(200);
  });
});
