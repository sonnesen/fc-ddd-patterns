import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../database/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepository {
    
    async create(customer: Customer): Promise<Customer> {
        const customerModel = await CustomerModel.create({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            city: customer.address.city,
            state: customer.address.state,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        }); 
        
        const newCustomer = new Customer(customerModel.id, customerModel.name);
        newCustomer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipcode));
        
        return newCustomer;
    }

    async update(customer: Customer): Promise<void> {
        await CustomerModel.update({
            name: customer.name,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            city: customer.address.city,
            state: customer.address.state,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,            
        }, {
            where: { id: customer.id },
        });
    }

    async delete(id: string): Promise<void> {
        await CustomerModel.destroy({
            where: { id },
        });
    }

    async findById(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findByPk(id);
        if (!customerModel) {
            throw new Error("Customer not found");
        }
        
        const customer = new Customer(customerModel.id, customerModel.name);
        customerModel.active ? customer.activate() : customer.deactivate();
        customer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipcode));
        return customer;
    }
    
    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll();
        return customersModel.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            customerModel.active ? customer.activate() : customer.deactivate();
            customer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.state, customerModel.zipcode));
            return customer;
        });
    }
}