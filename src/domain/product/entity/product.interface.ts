import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";

export default abstract class ProductInterface extends Entity {
    protected _name: string;
    protected _price: number;

    constructor(id: string, name: string, price: number) {
        super(id);
        this._name = name;
        this._price = price;

        this.validate();

        if (this._notification.hasErrors()) {
            throw new NotificationError(this._notification.errors);
        }
    }

    protected validate(): void {
        if (super.id.length === 0) {
            this._notification.addError({
                context: "product",
                message: "Id is required"
            });
        }
        if (this._name.length === 0) {
            this._notification.addError({
                context: "product",
                message: "Name is required"
            });
        }
        if (this._price <= 0) {
            this._notification.addError({
                context: "product",
                message: "Price must be greater than zero"
            });
        }
    }

    abstract changeName(name: string): void;
    abstract changePrice(price: number): void;

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}