import { getCustomRepository } from "typeorm"
import AppError from "../../../shared/errors/AppError"
import path from 'path'
import uploadConfig from '../../../config/upload'
import fs from 'fs'
import User from "../../users/infra/typeorm/entities/Users"
import { UsersRepository } from "../../users/infra/typeorm/repositories/UsersRepository"

interface Irequest {
    user_id: string
    avatarFilename: string
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Irequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User not found.')
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename

        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService
