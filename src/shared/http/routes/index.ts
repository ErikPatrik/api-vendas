import { Router } from "express";
import customersRouter from "../../../modules/customers/routes/customers.route";
import ordersRouter from "../../../modules/orders/routes/orders.route";
import productsRouter from "../../../modules/products/routes/products.route";
import passwordRouter from "../../../modules/users/routes/password.routes";
import profileRouter from "../../../modules/users/routes/profile.routes";
import sessionsRouter from "../../../modules/users/routes/sessions.routes";
import usersRouter from "../../../modules/users/routes/users.routes";

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)

export default routes
