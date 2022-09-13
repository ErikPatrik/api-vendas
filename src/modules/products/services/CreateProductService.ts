import { getCustomRepository } from "typeorm"
import RedisCache from "../../../shared/cache/RedisCache"
import AppError from "../../../shared/errors/AppError"
import Product from "../typeorm/entities/Product"
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

interface Irequest {
    name: string
    price: number
    quantity: number
}

class CreateProductService {
    public async execute({name, price, quantity}: Irequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository)
        const productExists = await productRepository.findByName(name)

        if (productExists) {
            throw new AppError('There is already one product with this name')
        }

        const product = productRepository.create({
            name,
            price,
            quantity
        })

        const redisCache = new RedisCache()
        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        return await productRepository.save(product)
    }
}

export default CreateProductService
