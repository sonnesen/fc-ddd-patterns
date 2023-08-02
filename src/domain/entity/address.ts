export default class Address {
    private _street: string;
    private _number: number;
    private _city: string;
    private _state: string;
    private _zipcode: string;

    constructor(street: string, number: number, city: string, state: string, zipcode: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._state = state;
        this._zipcode = zipcode;
        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipcode(): string {
        return this._zipcode;
    }

    private validate(): void {
        if (!this._street || !this._number || !this._city || !this._state || !this._zipcode) {
            throw new Error("Address must have a street, number, city, state and zipcode");
        }
    }

    toString(): string {
        return `${this._street}, ${this._number} - ${this._city}/${this._state} - ${this._zipcode}`;
    }
}