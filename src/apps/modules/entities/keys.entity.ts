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
export class Keys {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => UserFood)
  @ManyToOne((_type) => UserFood, (user_food: UserFood) => user_food.keys, { primary: true })
  @JoinColumn({ name: "user_id" })
  public user_food!: UserFood;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public publicKey!: string;

  @Field((_type) => String)
  @Column({ type: "simple-array", nullable: true })
  public refreshToken!: string[];

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
