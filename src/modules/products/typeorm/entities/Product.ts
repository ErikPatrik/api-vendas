import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import OrdersProducts from '../../../orders/typeorm/entities/OrdersProducts';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => OrdersProducts, order_products => order_products.product_id) // one products to many orders products
    order_products: OrdersProducts[]
}

export default Product
