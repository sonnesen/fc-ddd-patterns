import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private _customerRepository: CustomerRepositoryInterface;

	constructor(customerRepository: CustomerRepositoryInterface) {
		this._customerRepository = customerRepository;
	}

    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this._customerRepository.findAll();
        return OutputMapper.toOutput(customers);
    }
    
}

class OutputMapper {
    static toOutput(customers: Customer[]): OutputListCustomerDto {
        return {
            customers: customers.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.address.street,
                    number: customer.address.number,
                    city: customer.address.city,
                    state: customer.address.state,
                    zipcode: customer.address.zipcode,
                },
            })),
        };
    }
}