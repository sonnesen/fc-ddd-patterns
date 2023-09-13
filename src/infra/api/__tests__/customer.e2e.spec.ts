import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 123,
                    city: "City",
                    state: "State",
                    zipcode: "12345000"
                },
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.state).toBe("State");
        expect(response.body.address.zipcode).toBe("12345000");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
            });
        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        const response1 = await request(app)
            .post("/customers")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 123,
                    city: "City",
                    state: "State",
                    zipcode: "12345000"
                },
            });

        const response2 = await request(app)
            .post("/customers")
            .send({
                name: "Jane",
                address: {
                    street: "Street 2",
                    number: 321,
                    city: "City 2",
                    state: "State 2",
                    zipcode: "12345222"
                },
            });

        expect(response1.status).toBe(200);
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customers").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer1 = listResponse.body.customers[0];
        const customer2 = listResponse.body.customers[1];

        expect(customer1.name).toBe("John");
        expect(customer1.address.street).toBe("Street");
        expect(customer2.name).toBe("Jane");
        expect(customer2.address.street).toBe("Street 2");
    });
});