import { hash } from "bcryptjs"
import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import User from "../../users/infra/typeorm/entities/Users"
import { UsersRepository } from "../../users/infra/typeorm/repositories/UsersRepository"

interface Irequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({name, email, password}: Irequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)
        const emailExists = await usersRepository.findByEmail(email)

        if (emailExists) {
            throw new AppError('Email address already used.')
        }

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService
