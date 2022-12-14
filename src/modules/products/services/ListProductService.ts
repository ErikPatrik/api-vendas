import { getCustomRepository } from "typeorm"
import Product from "../infra/typeorm/entities/Product"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository"
import RedisCache from "../../../shared/cache/RedisCache"

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository)

        // config cache
        const redisCache = new RedisCache()

        let products = await redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST'
        )

        if (!products) {
            products = await productRepository.find()

            await redisCache.save('api-vendas-PRODUCT_LIST', products) // pass the key and the value
        }

        return products
    }
}

export default ListProductService
