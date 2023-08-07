import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./ordem-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<Order> {
        const orderModel = await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,                    
            })),            
        }, {
            include: [OrderItemModel],
        });

        return new Order(
            orderModel.id, 
            orderModel.customer_id, 
            orderModel.items.map((item) => {
                return new OrderItem(
                    item.id, 
                    item.name, 
                    item.price, 
                    item.quantity, 
                    item.product_id);
            })
        );
    }

    async update(entity: Order): Promise<void> {
        entity.items.map(async (item) => {
            await OrderItemModel.update({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId,
            }, {
                where: { id: item.id },
            });
        });
        
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
        }, {
            where: { id: entity.id },
        });
    }

    async delete(id: string): Promise<void> {
        await OrderModel.destroy({
            where: { id },
        });
    }

    async findById(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id },
            include: ["items"],
        });

        if (!orderModel) {
            throw new Error("Order not found");
        }
        
        return new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map((item) => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.quantity,
                    item.product_id,
                );
            }),
        );
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: ["items"],
        });

        return orderModels.map((orderModel) => {
            return new Order(
                orderModel.id,
                orderModel.customer_id,
                orderModel.items.map((item) => {
                    return new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.quantity,
                        item.product_id,
                    );
                }),
            );
        });        
    };
}