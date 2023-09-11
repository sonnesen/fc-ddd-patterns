import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/address";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order-item";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./ordem-item.model";

describe("Order repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id,
        );

        const order = new Order("1", customer.id, [orderItem]);
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id }, 
            include: ["items"] }
        );
        
        expect(orderModel?.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: product.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: product.id,                    
                },
            ],
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        let orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id,
        );

        let order = new Order("1", customer.id, [orderItem]);
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            4,
            product.id,
        );

        order = new Order("1", customer.id, [orderItem]);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id }, 
            include: ["items"] }
        );

        console.log(orderModel?.items[0].quantity);

        expect(orderModel?.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: 400,
            items: [
                {
                    id: "1",
                    name: "Product 1",
                    price: 100,
                    quantity: 4,
                    order_id: "1",
                    product_id: "1",
                },
            ],
        });
    });

    it("should delete an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id,
        );

        const order = new Order("1", customer.id, [orderItem]);
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        await orderRepository.deleteById(order.id);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id }, 
            include: ["items"] }
        );
        
        expect(orderModel).toBeNull();
    });

    it("should find an order by id", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id,
        );

        const order = new Order("1", customer.id, [orderItem]);
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.findById(order.id);

        expect(foundOrder).toStrictEqual(order);
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "City 1", "State 1", "12345000");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            2,
            product.id,
        );

        const order = new Order("1", customer.id, [orderItem]);
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrders = await orderRepository.findAll();

        expect(foundOrders).toStrictEqual([order]);
    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        await expect(orderRepository.findById("1")).rejects.toThrow("Order not found");
    });
});