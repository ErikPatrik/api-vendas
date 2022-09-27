import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import User from "../../users/infra/typeorm/entities/Users"
import { UsersRepository } from "../../users/infra/typeorm/repositories/UsersRepository"

interface IRequest {
    user_id: string
}

class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User not found.')
        }

        return user
    }
}

export default ShowProfileService
