import * as bcrypt from "bcryptjs";
import { Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { FavoriteFood } from "./food_favorite";
import OrderFood from "./food_order";
import { Keys } from "./keys.entity";
import { TipCart } from "./tip-cart.entity";
import { TipOrder } from "./tip-order";

@ObjectType()
@Entity()
@Unique(["username"])
export class UserFood {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @Length(4, 100)
  public username!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  public password!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  public email!: string;

  @Column({ type: "simple-array", nullable: true })
  roles: string[];

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => [OrderFood])
  @OneToMany((_type) => OrderFood, (order_food: OrderFood) => order_food.user_food)
  public order_food!: OrderFood[];

  @Field((_type) => [FavoriteFood])
  @OneToMany((_type) => FavoriteFood, (favorite_food: FavoriteFood) => favorite_food.user_food)
  public favorite_food!: FavoriteFood[];

  @Field((_type) => [Keys])
  @OneToMany((_type) => Keys, (key: Keys) => key.user_food)
  public keys!: Keys[];

  @Field((_type) => [TipCart])
  @OneToMany((_type) => TipCart, (tip_cart: TipCart) => tip_cart.user_food)
  public tip_cart!: TipCart[];

  @Field((_type) => [TipOrder])
  @OneToMany((_type) => TipOrder, (tip_order: TipOrder) => tip_order.user_food)
  public tip_order!: TipOrder[];

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
export default UserFood;
