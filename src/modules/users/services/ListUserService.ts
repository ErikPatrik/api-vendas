import { getCustomRepository } from "typeorm"
import User from "../../users/infra/typeorm/entities/Users"
import { UsersRepository } from "../../users/infra/typeorm/repositories/UsersRepository"

class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository)

        const users = await usersRepository.find()

        return users
    }
}

export default ListUserService
