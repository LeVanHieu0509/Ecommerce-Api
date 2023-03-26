import { UserFood } from "./food_user";
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

@ObjectType()
@Entity()
export class CategoryFood {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar" })
  @Length(0, 100)
  public title!: string;

  @Field()
  @Column({ type: "varchar" })
  @Length(4, 100)
  public image!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => [ProductFood])
  @OneToMany(
    (_type) => ProductFood,
    (product_food: ProductFood) => product_food.category_food
  )
  public product_food!: ProductFood[];
}
export default CategoryFood;
