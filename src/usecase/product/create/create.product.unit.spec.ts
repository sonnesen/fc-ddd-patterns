import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "A",
    id: "1", 
    name: "Product A",
    price: 123
};

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product", async() => {
        const repository = MockRepository();
        const usecase = new CreateProductUseCase(repository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const repository = MockRepository();
        const usecase = new CreateProductUseCase(repository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    })

    it("should throw an error when price is less than or equal to zero", async () => {
        const repository = MockRepository();
        const usecase = new CreateProductUseCase(repository);

        input.name = "Product";
        input.price = 0;

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero");
    })
});