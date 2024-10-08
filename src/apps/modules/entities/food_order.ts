import { Field, ObjectType } from "type-graphql";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductFood } from "./food_product";
import UserFood from "./food_user";

@ObjectType()
@Entity()
export class OrderFood {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => UserFood)
  @ManyToOne((_type) => UserFood, (user_food: UserFood) => user_food.order_food, { primary: true })
  @JoinColumn({ name: "user_food_id" })
  public user_food!: ProductFood;

  @Field((_type) => ProductFood)
  @ManyToOne((_type) => ProductFood, (product_food: ProductFood) => product_food.order_food, { primary: true })
  @JoinColumn({ name: "product_food_id" })
  public product_food!: ProductFood;
}
export default OrderFood;
