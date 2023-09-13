import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductValidatorFactory from "../factory/product.validator.factory";

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
        ProductValidatorFactory.create().validate(this);
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