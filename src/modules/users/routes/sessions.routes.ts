import { Router } from 'express'
import { Joi, Segments, celebrate } from 'celebrate'
import SessionsContoller from '../controllers/SessionsController'

const sessionsRouter = Router()
const sessionsController = new SessionsContoller()

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionsController.create
)

export default sessionsRouter
