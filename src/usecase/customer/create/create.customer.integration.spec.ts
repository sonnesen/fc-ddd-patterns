import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Test create customer use case", () => {

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

    it("should create a customer", async () => {
        const repository = new CustomerRepository();
        const usecase = new CreateCustomerUseCase(repository);

        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "city", "state", "zipcode");
        customer.changeAddress(address);
        await repository.create(customer);

        const input = {
            id: "123",
        }

        const output = new Customer("123", "John");
        output.changeAddress(new Address("Street", 123, "city", "state", "zipcode"));
        
        const result = await repository.findById(input.id);
        expect(result).toEqual(output);        
    });
})