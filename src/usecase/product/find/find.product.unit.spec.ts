import FindCustomerUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product", 999);

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    };
};

describe("Unit test find product use case", () => {

    it("should find a product", async () => {
        const repository = MockRepository();
        const usecase = new FindProductUseCase(repository);

        const input = {
            id: "1",
        }

        const output = {
            id: "1",
            name: "Product",
            price: 999,
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const repository = MockRepository();
        repository.findById.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const usecase = new FindCustomerUseCase(repository);

        const input = {
            id: "123",
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
})