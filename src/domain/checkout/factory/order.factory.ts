import Order from "../entity/order";
import { v4 as uuid } from 'uuid';
import OrderItem from "../entity/order-item";

interface OrderInterface {
    customerId: string;
    items: {
        id: string,
        name: string,
        price: number,
        quantity: number,
        productId: string
    }[]
}

export default class OrderFactory {
    static create(order: OrderInterface): Order {
        const items = order.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.quantity, item.productId);
        });
        return new Order(uuid(), order.customerId, items);
    }
}