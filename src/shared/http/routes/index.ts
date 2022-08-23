import { Router } from "express";
import productsRouter from "../../../modules/products/typeorm/routes/products.route";

const routes = Router()

routes.use('/products', productsRouter)

export default routes
