import { CategoryFood } from "./food_category";
import { ProductFood } from "./food_product";
import * as bcrypt from "bcryptjs";
import { IsNotEmpty, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import OrderFood from "./food_order";
import { Keys } from "./keys.entity";

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

  @Field((_type) => [Keys])
  @OneToMany((_type) => Keys, (key: Keys) => key.user_food)
  public keys!: Keys[];

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
export default UserFood;
