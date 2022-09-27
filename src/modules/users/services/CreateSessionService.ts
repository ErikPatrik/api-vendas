import { compare, hash } from "bcryptjs"
import { sign } from "jsonwebtoken"
import authConfig from '../../../config/auth'
import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import User from "../../users/infra/typeorm/entities/Users"
import { UsersRepository } from "../../users/infra/typeorm/repositories/UsersRepository"

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

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        })

        return {
            user,
            token
        }
    }
}

export default CreateSessionService
