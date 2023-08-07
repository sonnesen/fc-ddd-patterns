import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product unit tests", () => {
    it("should change the prices of all products", () => {
        // Arrange
        const products = [
            new Product("1", "Product 1", 100),
            new Product("2", "Product 2", 200),
            new Product("3", "Product 3", 300),
        ];
        
        // Act
        ProductService.increasePrice(products, 10);
                
        // Assert
        expect(products[0].price).toEqual(110);
        expect(products[1].price).toEqual(220);
        expect(products[2].price).toEqual(330);
    });
});