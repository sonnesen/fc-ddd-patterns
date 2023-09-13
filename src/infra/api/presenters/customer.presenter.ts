import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {

    static toXML(data: OutputListCustomerDto): string {
        const config = {
            header: true,
            indent: "  ",
            newline: "\n",
            allowEmpty: true,
        };

        const content = {
            customers: {
                customer: data.customers.map((customer) => ({
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
            }
        };

        return toXML(content, config);
    }
}