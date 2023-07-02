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
export class TipCart {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => UserFood)
  @ManyToOne((_type) => UserFood, (user_food: UserFood) => user_food.tip_cart, { primary: true })
  @JoinColumn({ name: "user_id" })
  public user_food!: UserFood;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public cart_state!: string;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public cart_products!: string; //array

  @Field((_type) => String)
  @Column({ type: "int", default: 0 })
  public cart_count_product!: number;

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
