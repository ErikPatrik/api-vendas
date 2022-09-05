import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import { UsersRepository } from "../typeorm/repositories/UsersRepository"
import { UserTokensRepository } from "../typeorm/repositories/UserTokensRepository"
import EtherealMail from '../../../config/mail/EtherealMail'

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

        await EtherealMail.sendMail({
            to: email,
            body: `Received password reset request: ${token?.token}`
        })
    }
}

export default SendForgotPasswordEmailService
