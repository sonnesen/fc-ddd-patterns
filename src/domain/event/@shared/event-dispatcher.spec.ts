import Customer from "../../entity/customer";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import CustomerAddressChangedEventHandler from "../customer/handler/customer-address-changed-event.handler";
import CustomerCreatedEvent1Handler from "../customer/handler/customer-created-event_1.handler";
import CustomerCreatedEvent2Handler from "../customer/handler/customer-created-event_2.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toBe(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
    });

    it("should unregister all event handlers by event name", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregisterAllByEventName("ProductCreatedEvent");

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(0);
    });

    it("should notify event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spy = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toBe(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 100
        });

        eventDispatcher.notify(productCreatedEvent);  
        expect(spy).toHaveBeenCalledTimes(1);      
    });

    it("should notify event handlers when a customer was created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new CustomerCreatedEvent1Handler();
        const eventHandler2 = new CustomerCreatedEvent2Handler();
        const spy1 = jest.spyOn(eventHandler1, "handle");
        const spy2 = jest.spyOn(eventHandler2, "handle");
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent").length).toBe(2);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[0]).toBe(eventHandler1);
        expect(eventDispatcher.getEventHandlers("CustomerCreatedEvent")[1]).toBe(eventHandler2);
        
        const customer = new Customer("1", "Customer 1");
        const customerCreatedEvent = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spy1).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it("should notify event handlers when customer address was changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CustomerAddressChangedEventHandler();
        const spy = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("CustomerAddressChangedEvent")[0]).toBe(eventHandler);

        const customerChangedEvent = new CustomerAddressChangedEvent({
            id: '1',
            name: 'Customer 1',
            address: {
               street: 'Street 1',
               number: '123',
               zip: '12345678',
               city: 'City 1',
            }
         });

        eventDispatcher.notify(customerChangedEvent);

        expect(spy).toHaveBeenCalledTimes(1);
    });

});