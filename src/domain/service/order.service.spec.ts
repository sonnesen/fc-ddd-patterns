import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should calculate the total of all orders", () => {
        // Arrange
        const item1 = new OrderItem("1", "Item 1", 100, 1, "product1");
        const item2 = new OrderItem("2", "Item 2", 25, 2, "product2");

        const order1 = new Order("1", "Customer 1", [item1]);
        const order2 = new Order("2", "Customer 2", [item2]);

        // Act
        const total = OrderService.total([order1, order2]);

        // Assert
        expect(total).toEqual(150);
    });

    it("should place an order", () => {
        // Arrange
        const customer = new Customer("1", "Customer 1");
        const item1 = new OrderItem("1", "Item 1", 100, 1, "product1");
        const item2 = new OrderItem("2", "Item 2", 25, 2, "product2");        

        // Act
        const order = OrderService.placeOrder(customer, [item1, item2]);

        // Assert
        expect(customer.rewardPoints).toEqual(75);
        expect(order.total()).toEqual(150);
    });

});