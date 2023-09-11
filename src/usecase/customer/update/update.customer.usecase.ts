import Address from "../../../domain/customer/entity/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private _customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this._customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this._customerRepository.findById(input.id);
        customer.changeName(input.name);
        customer.changeAddress(
            new Address(
                input.address.street,
                input.address.number,
                input.address.city,
                input.address.state,
                input.address.zipcode,
            )
        );

        await this._customerRepository.update(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                number: customer.address.number,
                city: customer.address.city,
                state: customer.address.state,
                zipcode: customer.address.zipcode,
            },
        };
    }

}