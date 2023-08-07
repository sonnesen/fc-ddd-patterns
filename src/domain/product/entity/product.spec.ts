import Product from "./product";

describe("Product unit tests", () => {
    it("should throw an error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 100);
        }).toThrowError("Id is required");
    });

    it("should throw an error when name is empty", () => {
        expect(() => {
            new Product("1", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw an error when price is less than or equal to zero", () => {
        expect(() => {
            new Product("1", "Product 1", 0);
        }).toThrowError("Price must be greater than zero");
    });

    it("should change name", () => {
        // Arrange
        const product = new Product("1", "Product 1", 100);

        // Act
        product.changeName("Product 2");

        // Assert
        expect(product.name).toEqual("Product 2");
    });

    it("should change price", () => {
        // Arrange
        const product = new Product("1", "Product 1", 100);

        // Act
        product.changePrice(200);

        // Assert
        expect(product.price).toEqual(200);
    });
});