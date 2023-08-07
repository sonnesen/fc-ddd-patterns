import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: Map<string, EventHandlerInterface[]> = new Map();
    
    getEventHandlers(eventName: string): EventHandlerInterface[] {
        return this.eventHandlers.get(eventName) || [];
    }

    notify(event: EventInterface): void {
        const eventHandlers = this.getEventHandlers(event.constructor.name);
        eventHandlers.forEach(eventHandler => {
            eventHandler.handle(event);
        });
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        const eventHandlers = this.getEventHandlers(eventName);
        eventHandlers.push(eventHandler);
        this.eventHandlers.set(eventName, eventHandlers);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        const eventHandlers = this.getEventHandlers(eventName);
        const index = eventHandlers.indexOf(eventHandler);
        if (index !== -1) {
            eventHandlers.splice(index, 1);
        }
    }

    unregisterAllByEventName(eventName: string): void {
        this.eventHandlers.delete(eventName);
    }

    unregisterAll(): void {
        this.eventHandlers.clear();
    }
}
