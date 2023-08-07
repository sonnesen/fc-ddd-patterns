import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/entity/address";

describe("Customer repository unit tests", () => {

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
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zipcode: customer.address.zipcode,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        customer.deactivate();
        customer.addRewardPoints(100);
        const newAddress = new Address("Street 2", 456, "City 2", "State 2", "12345000");
        customer.changeAddress(newAddress);
        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            state: customer.address.state,
            zipcode: customer.address.zipcode,
        });
    });

    it("should delete a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        await customerRepository.delete("1");

        const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

        expect(customerModel).toBeNull();
    });

    it("should find a customer by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerFound = await customerRepository.findById("1");

        expect(customerFound).toStrictEqual(customer);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();

        await expect(customerRepository.findById("1")).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);
        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", 456, "City 2", "State 2", "12345000");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toStrictEqual([customer1, customer2]);
    });

});    

