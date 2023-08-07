import OrderItem from "./order-item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    addItem(item: OrderItem): void {
        this._items.push(item);
        this.validate();
    }

    private validate(): void {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._customerId.length === 0) {
            throw new Error('CustomerId is required');
        }
        if (this._items.length === 0) {
            throw new Error('Items are required');
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error('Quantity must be greater than zero');
        }
    }

    total(): number {
        return this._items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

}