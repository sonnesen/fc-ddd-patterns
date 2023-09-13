import ProductInterface from "./product.interface";

export default class ProductB extends ProductInterface {
    constructor(id: string, name: string, price: number) {
        super(id, name, price);        
    }

    override get price(): number {
        return this._price * 2;
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changePrice(price: number): void {
        this._price = price;
        this.validate();
    }
}