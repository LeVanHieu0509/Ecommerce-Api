import { ProductFood } from "./food_product";
import { Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import UserFood from "./food_user";

@ObjectType()
@Entity()
export class OrderFood {
  @Column()
  public product_id: number;

  @Column()
  public user_id: number;

  @Field((_type) => UserFood)
  @ManyToOne(
    (_type) => UserFood,
    (user_food: UserFood) => user_food.order_food,
    { primary: true }
  )
  @JoinColumn({ name: "user_food_id" })
  public user_food!: ProductFood;

  @Field((_type) => ProductFood)
  @ManyToOne(
    (_type) => ProductFood,
    (product_food: ProductFood) => product_food.order_food,
    { primary: true }
  )
  @JoinColumn({ name: "product_food_id" })
  public product_food!: ProductFood;
}
export default OrderFood;
