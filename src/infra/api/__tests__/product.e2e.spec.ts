import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                type: "A",
                name: "Product A",
                price: 999,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product A");
        expect(response.body.price).toBe(999);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product",
            });
        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response1 = await request(app)
            .post("/products")
            .send({
                type: "A",
                name: "Product A",
                price: 999,
            });

        const response2 = await request(app)
            .post("/products")
            .send({
                type: "B",
                name: "Product B",
                price: 899,
            });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/products").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products[0];
        const product2 = listResponse.body.products[1];

        expect(product1.name).toBe("Product A");
        expect(product1.price).toBe(999);
        expect(product2.name).toBe("Product B");
        expect(product2.price).toBe(1798);
    });
});