import { getCustomRepository } from "typeorm"
import RedisCache from "../../../shared/cache/RedisCache"
import AppError from "../../../shared/errors/AppError"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository"

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

        const redisCache = new RedisCache()
        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        await productRepository.remove(product)
    }
}

export default DeleteProductService
