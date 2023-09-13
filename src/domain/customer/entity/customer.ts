import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "./address";

export default class Customer extends Entity {
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super(id);        
        this._name = name;
        this.validate();

        if (this._notification.hasErrors()) {
            throw new NotificationError(this._notification.errors);
        }
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address {
        return this._address;
    }

    private validate(): void {
        if (this.id.length === 0) {
            this._notification.addError({
                context: "customer",
                message: "Id is required"
            });
        }
        if (this._name.length === 0) {
            this._notification.addError({
                context: "customer",
                message: "Name is required"
            });
        }
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address): void {
        this._address = address;
        this.validate();
    }

    activate(): void {
        if (this._address === undefined) {
            throw new Error('Address is mandatory to activate a customer');
        }
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }
}