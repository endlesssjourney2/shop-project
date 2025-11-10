import request from "supertest";
import app from "../index";
import db from "../db";

jest.mock("../db", () => ({
  collection: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({
      forEach: (callback: Function) => {
        callback({ id: "1", data: () => ({ name: "Test Plant 1" }) });
        callback({ id: "2", data: () => ({ name: "Test Plant 2" }) });
      },
    }),
    doc: jest.fn((id: string) => ({
      get: jest.fn().mockResolvedValue({ exists: false }),
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

  it("should return 404 for a non-existent product", async () => {
    const res = await request(app).get("/api/products/nonexistent-id");

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Product not found");
  });
});
