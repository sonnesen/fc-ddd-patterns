export interface InputListCustomerDto {}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        city: string;
        state: string;
        zipcode: string;
    };
};

export interface OutputListCustomerDto {
    customers: Customer[];
}