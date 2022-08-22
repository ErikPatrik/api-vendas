import { getCustomRepository } from "typeorm"
import AppError from "../../../../shared/errors/AppError"
import { ProductRepository } from "../repositories/ProductsRepository"

interface Irequest {
    id: string
}

class DeleteProductService {
    public async execute({id}: Irequest): Promise<void> {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id)

        if (!product) {
            throw new AppError('Product not found.')
        }

        await productRepository.remove(product)
    }
}

export default DeleteProductService
