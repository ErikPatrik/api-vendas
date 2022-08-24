import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import User from "../typeorm/entities/Users"
import UsersRepository from "../typeorm/repositories/UsersRepository"

class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository)

        const users = await usersRepository.find()

        return users
    }
}

export default ListUserService
