import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.repository.findById(input.id);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}