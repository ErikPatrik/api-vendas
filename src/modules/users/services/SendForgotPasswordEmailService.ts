import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import { UsersRepository } from "../typeorm/repositories/UsersRepository"
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository"

interface Irequest {
    email: string
}

class SendForgotPasswordEmailService {
    public async execute({ email }: Irequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository)
        const userTokensRepository = getCustomRepository(UserTokensRepository)

        const user = await usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User does not exists')
        }

        const token = await userTokensRepository.generate(user.id)

        console.log(token)
    }
}

export default SendForgotPasswordEmailService
