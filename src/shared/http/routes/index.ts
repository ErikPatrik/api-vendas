import { Router } from "express";
import productsRouter from "../../../modules/products/routes/products.route";
import usersRouter from "../../../modules/users/routes/users.routes";

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)

export default routes
