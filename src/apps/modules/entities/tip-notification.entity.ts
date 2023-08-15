import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import UserFood from "./food_user";
import { TipProducts } from "./tip-product.entity";

@ObjectType()
@Entity()
export class TipNotification {
    @Field((_type) => Number)
    @PrimaryGeneratedColumn()
    public id!: number;

    @Field()
    @Column({ type: "varchar", enum: ['ORDER-001', 'ORDER-002', 'PROMOTION-001', 'SHOP-001'] })
    public noti_type?: string;

    @Field()
    @Column({ type: "int", nullable: true })
    public noti_senderId!: number;

    @Field()
    @Column({ type: "int", nullable: true })
    public noti_receivedId!: number;

    @Field()
    @Column({ type: "varchar", nullable: true })
    public noti_content!: string;

    @Field()
    @Column({ type: "varchar", nullable: true, default: JSON.stringify({}) })
    public noti_options?: string;

    @Field()
    @CreateDateColumn()
    public createdAt!: Date;

    @Field()
    @UpdateDateColumn()
    public updatedAt!: Date;

    // @Field((_type) => TipProducts)
    // @ManyToOne(() => TipProducts, (tip_product) => tip_product.tip_comment, {
    //     cascade: true,
    // })
    // @JoinColumn({ name: "tip_product_id" })
    // public tip_product?: TipProducts;

    // @Field((_type) => UserFood)
    // @ManyToOne(() => UserFood, (user_food) => user_food.tip_comment, {
    //     cascade: true,
    // })
    // @JoinColumn({ name: "tip_user_id" })
    // public user_food?: UserFood;
}
export default TipNotification;
