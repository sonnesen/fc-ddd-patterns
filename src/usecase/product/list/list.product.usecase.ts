import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private _repository: ProductRepositoryInterface;

	constructor(repository: ProductRepositoryInterface) {
		this._repository = repository;
	}

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this._repository.findAll();
        return OutputMapper.toOutput(products);
    }
    
}

class OutputMapper {
    static toOutput(products: ProductInterface[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}