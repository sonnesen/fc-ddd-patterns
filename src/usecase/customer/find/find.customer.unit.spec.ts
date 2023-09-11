import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "city", "state", "zipcode");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        deleteById: jest.fn(),
    };
};

describe("Unit test find customer use case", () => {

    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                number: 123,
                city: "city",
                state: "state",
                zipcode: "zipcode"
            }
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.findById.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found");
    });
})