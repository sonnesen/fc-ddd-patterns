import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    id: "123", 
    name: "John",
    address: {
        street: "Street", 
        number: 123, 
        city: "city", 
        state: "state", 
        zipcode: "zipcode"
    },
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

describe("Unit test create customer use case", () => {
    it("should create a customer", async() => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                city: input.address.city,
                state: input.address.state,
                zipcode: input.address.zipcode,
            },
        });
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name is required");
    })

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(usecase.execute(input)).rejects.toThrow("Address must have a street, number, city, state and zipcode");
    })
});