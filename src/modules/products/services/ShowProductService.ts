import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import Product from "../infra/typeorm/entities/Product"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository"

interface Irequest {
    id: string
}

class ShowProductService {
    public async execute({id}: Irequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id)

        if (!product) {
            throw new AppError('Product not found.')
        }

        return product
    }
}

export default ShowProductService
