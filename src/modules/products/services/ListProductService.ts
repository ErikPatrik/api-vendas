import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import Product from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository)

        const products = await productRepository.find()

        return products
    }
}

export default ListProductService
