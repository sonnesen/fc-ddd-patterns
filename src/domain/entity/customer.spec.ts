import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw an error when id is empty", () => {
        expect(() => {
            new Customer("", "John Doe");
        }).toThrowError("Id is required");
    });

    it("should throw an error when name is empty", () => {
        expect(() => {
            new Customer("1", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
        // Arrange
        const customer = new Customer("1", "John Doe");
        
        // Act
        customer.changeName("Jane Doe");
        
        // Assert
        expect(customer.name).toEqual("Jane Doe");
    });

    it("should activate customer", () => {
        // Arrange
        const customer = new Customer("1", "John Doe");
        const address = new Address("Street", 1, "City", "State", "Zipcode");
        customer.changeAddress(address);
        
        // Act
        customer.activate();
        
        // Assert
        expect(customer.isActive()).toBeTruthy();
    });

    it("should deactivate customer", () => {
        // Arrange
        const customer = new Customer("1", "John Doe");
        
        // Act
        customer.deactivate();
        
        // Assert
        expect(customer.isActive()).toBeFalsy();
    });

    it("should throw an error when activating a customer without address", () => {
        expect(() => {
            const customer = new Customer("1", "John Doe");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
});