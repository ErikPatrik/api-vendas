import { getCustomRepository } from "typeorm"
import AppError from "../../../../shared/errors/AppError"
import { CustomersRepository } from "../../../customers/typeorm/repositories/CustomersRepository"
import { ProductRepository } from "../../../products/typeorm/repositories/ProductsRepository"
import Order from "../entities/Order"
import OrdersRepository from "../repositories/OrdersRepository"

interface IProduct {
    id: string
    quantity: number
}

interface Irequest {
    customer_id: string
    products: IProduct[]
}

class CreateOrderService {
    public async execute({ customer_id, products}: Irequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository)
        const customersRepository = getCustomRepository(CustomersRepository)
        const productsRepository = getCustomRepository(ProductRepository)

        const customerstExists = await customersRepository.findById(customer_id)

        if (!customerstExists) {
            throw new AppError('Could not find any customer with the given id.')
        }

        const existsProducts = await productsRepository.findAllByIds(products)

        if (!existsProducts.length) {
            throw new AppError('Could not find any products with the given id.')
        }

        const existsProductsIds = existsProducts.map((product) => product.id)

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id)
        ) // products not exists in API

        if (checkInexistentProducts.length) {
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`)
        }

        const quantityAvailable = products.filter(
            product => existsProducts.filter(
                p => p.id === product.id
            )[0].quantity < product.quantity
        )

        if (quantityAvailable.length) {
            throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`)
        }

        const serializedProducts = products.map( // array containg objetc of products
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id === product.id)[0].price
            })
        )

        const order = await ordersRepository.createOrder({
            customer: customerstExists,
            products: serializedProducts
        })
    }
}

export default CreateOrderService
