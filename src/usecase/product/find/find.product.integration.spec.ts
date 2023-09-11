import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infra/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infra/product/repository/sequelize/product.model";

describe("Test find product use case", () => {

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

    it("should find a product", async () => {
        const repository = new ProductRepository();
        const usecase = new FindProductUseCase(repository);

        const product = new Product("1", "Product", 999);
        await repository.create(product);

        const input = {
            id: "1",
        }

        const output = {
            id: "1",
            name: "Product",
            price: 999,
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
})