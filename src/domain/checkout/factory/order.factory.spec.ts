import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
    it("should create an order", () => {
        const order = OrderFactory.create({
            customerId: "1",
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 1,
                    quantity: 1,
                    productId: "1"
                }
            ]
        });
    });
});