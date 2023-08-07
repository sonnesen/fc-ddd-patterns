import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
    it ("should create a product of type A", () => {
        const product = ProductFactory.create("A", "Product A", 1);

        expect(product).toBeDefined();
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    });

    it ("should create a product of type B", () => {
        const product = ProductFactory.create("B", "Product B", 2);

        expect(product).toBeDefined();
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(4);
        expect(product.constructor.name).toBe("ProductB");
    });

    it ("should throw an error when type is invalid", () => {
        expect(() => {
            ProductFactory.create("C", "Product C", 3);
        }).toThrowError("Invalid product type");
    });
});  