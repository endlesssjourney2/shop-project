import request from "supertest";
import app from "../index";

jest.mock("../db", () => ({
  collection: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({
      forEach: (callback: Function) => {
        callback({ id: "1", data: () => ({ name: "Test Plant 1" }) });
        callback({ id: "2", data: () => ({ name: "Test Plant 2" }) });
      },
    }),
    add: jest.fn().mockResolvedValue({ id: "new-product-id" }),

    doc: jest.fn((id: string) => ({
      get: jest.fn().mockResolvedValue({
        exists: id === "nonexistent-id" ? false : true,
      }),
      delete: jest.fn().mockResolvedValue(undefined),
    })),
  })),
}));

describe("API Routes", () => {
  it("should GET all products successfully", async () => {
    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(2);
  });

  it("should return 404 for a non-existent product on GET", async () => {
    const res = await request(app).get("/api/products/nonexistent-id");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Product not found");
  });

  it("should return 400 if required fields are missing on POST", async () => {
    const badProduct = {
      price: 99,
      category: "Test",
    };

    const res = await request(app).post("/api/products").send(badProduct);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Bad Request");
  });

  it("should return 404 for a non-existent product on DELETE", async () => {
    const res = await request(app).delete("/api/products/nonexistent-id");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Product not found");
  });
});
