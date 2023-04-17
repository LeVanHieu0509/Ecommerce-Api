import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductFood } from "./food_product";
import UserFood from "./food_user";

@ObjectType()
@Entity()
export class CheckoutFood {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public status?: string;

  @Field()
  @Column({ type: "float", nullable: true })
  public bill_price?: number;

  @Field((_type) => UserFood)
  @ManyToOne((_type) => UserFood, (user_food: UserFood) => user_food.order_food, { primary: true })
  @JoinColumn({ name: "user_food_id" })
  public user_food!: ProductFood;
}
export default CheckoutFood;
