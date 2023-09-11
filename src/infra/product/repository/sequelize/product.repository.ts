import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product.repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    
    async create(product: Product): Promise<Product> {
        const productModel = await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
        });
        return new Product(productModel.id, productModel.name, productModel.price);
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update({
            name: product.name,
            price: product.price,
        }, {
            where: { id: product.id },
        });
    }

    async deleteById(id: string): Promise<void> {
        await ProductModel.destroy({
            where: { id },
        });
    }

    async findById(id: string): Promise<Product> {
        const productModel = await ProductModel.findByPk(id);
        if (!productModel) {
            throw new Error("Product not found");
        }
        return new Product(productModel.id, productModel.name, productModel.price);
    }
    
    async findAll(): Promise<Product[]> {
        const productsModel = await ProductModel.findAll();
        return productsModel.map((productModel) => {
            return new Product(productModel.id, productModel.name, productModel.price);
        });
    }
}