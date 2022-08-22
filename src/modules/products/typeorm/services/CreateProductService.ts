import { getCustomRepository } from "typeorm"
import AppError from "../../../../shared/errors/AppError"
import Product from "../entities/Product"
import { ProductRepository } from "../repositories/ProductsRepository"

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

        return await productRepository.save(product)
    }
}

export default CreateProductService
