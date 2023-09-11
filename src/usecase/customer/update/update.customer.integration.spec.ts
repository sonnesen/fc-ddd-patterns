import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Test update customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);

        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "city", "state", "zipcode");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "123",
            name: "John Updated",
            address: {
                street: "Street Updated",
                number: 321,
                city: "city Updated",
                state: "state Updated",
                zipcode: "codezip"
            }
        }

        const output = {
            id: "123",
            name: "John Updated",
            address: {
                street: "Street Updated",
                number: 321,
                city: "city Updated",
                state: "state Updated",
                zipcode: "codezip"
            }
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
})