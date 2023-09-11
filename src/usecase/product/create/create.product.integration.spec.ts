import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository);

        const product = new Product("123", "John", 123);
        await repository.create(product);

        const input = {
            id: "123",
        }

        const output = new Product("123", "John", 123);
                
        const result = await repository.findById(input.id);
        expect(result).toEqual(output);        
    });
})