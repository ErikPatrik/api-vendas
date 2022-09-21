import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "../../../customers/infra/typeorm/entities/Customer";
import OrdersProducts from "./OrdersProducts";

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer) // many orders to one customer
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => OrdersProducts, order_products => order_products.order, {
        cascade: true // when the order was create/save, all the relations order_procuts will be automaticaly save in database
    })
    order_products: OrdersProducts[]; // one order to many orders products

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order
