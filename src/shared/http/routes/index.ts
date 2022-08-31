import { Router } from "express";
import productsRouter from "../../../modules/products/routes/products.route";
import passwordRouter from "../../../modules/users/routes/password.routes";
import sessionsRouter from "../../../modules/users/routes/sessions.routes";
import usersRouter from "../../../modules/users/routes/users.routes";

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)

export default routes
