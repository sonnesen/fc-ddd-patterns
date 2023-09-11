import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create(
    "A",
    "Product",
    999
);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 899,
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
        update: jest.fn(),
        deleteById: jest.fn(),
    };
};

describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const repository = MockRepository();
        const usecase = new UpdateProductUseCase(repository);
        const output = await usecase.execute(input);
        expect(output).toEqual(input);              
    });
});