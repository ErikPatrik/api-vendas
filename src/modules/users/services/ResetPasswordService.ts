import { getCustomRepository } from "typeorm"
import { isAfter, addHours } from 'date-fns'
import AppError from "../../../shared/errors/AppError"
import { UsersRepository } from "../../users/infra/typeorm/repositories/UsersRepository"
import { UserTokensRepository } from "../../users/infra/typeorm/repositories/UserTokensRepository"
import { hash } from "bcryptjs"

interface Irequest {
    token: string
    password: string
}

class ResetPasswordService {
    public async execute({ token, password }: Irequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository)
        const userTokensRepository = getCustomRepository(UserTokensRepository)

        const userToken = await userTokensRepository.findByToken(token)

        if (!userToken) {
            throw new AppError('User Token does not exists.')
        }

        const user = await usersRepository.findById(userToken.user_id)

        if (!user) {
            throw new AppError('User doest not exists.')
        }

        const tokenCreateAt = userToken.created_at
        const compareDate = addHours(tokenCreateAt, 2)

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.')
        }

        user.password = await hash(password, 8)

        await usersRepository.save(user)
    }
}

export default ResetPasswordService
