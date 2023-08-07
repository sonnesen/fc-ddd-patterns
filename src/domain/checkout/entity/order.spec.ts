import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {
    it("should throw an error when id is empty", () => {
        expect(() => {
            new Order("", "1", []);
        }).toThrowError("Id is required");
    });

    it("should throw an error when customerId is empty", () => {
        expect(() => {
            new Order("1", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw an error when items is empty", () => {
        expect(() => {
            new Order("1", "1", []);
        }).toThrowError("Items are required");
    });

    it("should calculate total", () => {
        // Arrange
        const item1 = new OrderItem("1", "Item 1", 100, 2, "product-1");
        const item2 = new OrderItem("2", "Item 2", 50, 3, "product-2");
        const order1 = new Order("1", "1", [item1]);
        const order2 = new Order("2", "2", [item1, item2]);

        // Act
        const total1 = order1.total();
        const total2 = order2.total();

        // Assert
        expect(total1).toEqual(200);
        expect(total2).toEqual(350);
    });

    it("should throw error if the quantity of an item is less than or equal zero", () => {
        expect(() => {
            const item = new OrderItem("1", "Item 1", 100, 0, "product-1");
            new Order("1", "1", [item]);
        }).toThrowError("Quantity must be greater than zero");
    });
});