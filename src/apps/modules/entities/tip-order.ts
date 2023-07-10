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

@ObjectType()
@Entity()
export class TipOrder {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => UserFood)
  @ManyToOne((_type) => UserFood, (user_food: UserFood) => user_food.tip_cart, { primary: true })
  @JoinColumn({ name: "user_id" })
  public user_food!: UserFood;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public order_checkout!: string; //object

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public order_shipping!: string; //object

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public order_payment!: string; //object

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public order_product!: string; //array

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public order_trackingNumber!: string; //string

  @Field((_type) => String)
  @Column({
    type: "varchar",
    nullable: true,
    enum: ["pending", "confirmed", "cancelled", "delivered"],
    default: "pending",
  })
  public order_status!: string; //string

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
