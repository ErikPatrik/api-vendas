import { compare, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import User from "../typeorm/entities/Users"
import { UsersRepository } from "../typeorm/repositories/UsersRepository"

interface Irequest {
    email: string
    password: string
}

interface IResponse {
    user: User,
    token: string
}

class CreateSessionService {
    public async execute({ email, password}: Irequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository)
        const user = await usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const passwordConfirmed = await compare(password, user.password)

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '12345678910'

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token
        }
    }
}

export default CreateSessionService
