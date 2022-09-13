import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import Order from "../../orders/typeorm/entities/Order"
import OrdersRepository from "../../orders/typeorm/repositories/OrdersRepository"

interface Irequest {
    id: string
}

class ShowOrderService {
    public async execute({ id }: Irequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository)

        const order = await ordersRepository.findById(id)

        if (!order) {
            throw new AppError('Order not found.')
        }

        return order
    }
}

export default ShowOrderService
