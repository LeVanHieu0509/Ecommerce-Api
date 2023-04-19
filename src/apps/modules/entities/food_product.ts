import { FavoriteFood } from "./food_favorite";
import { CategoryFood } from "./food_category";
import { Service } from "typedi";
import { IsNotEmpty } from "class-validator";
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
import OrderFood from "./food_order";

@Service()
@Entity()
@ObjectType() //Nó đánh dấu lớp là typeđã biết từ GraphQL SDL hoặc GraphQLObjectTypetừ graphql-js:
export class ProductFood {
  // Sau đó, chúng tôi khai báo thuộc tính lớp nào sẽ được ánh xạ tới các trường GraphQL.
  // Để làm điều này, chúng tôi sử dụng @Field trình trang trí, cũng được sử dụng để thu thập siêu dữ liệu từ hệ thống phản ánh
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public title?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public description?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public image?: string;

  @Field()
  @Column({ type: "float", nullable: true })
  public price?: number;

  @Field((_type) => [OrderFood])
  @OneToMany((_type) => OrderFood, (order_food: OrderFood) => order_food.product_food)
  public order_food!: OrderFood[];

  @Field((_type) => [FavoriteFood])
  @OneToMany((_type) => FavoriteFood, (favorite_food: FavoriteFood) => favorite_food.product_food)
  public favorite_food!: FavoriteFood[];

  @Field((_type) => CategoryFood)
  @ManyToOne(() => CategoryFood, (categoty_food) => categoty_food.product_food, {
    cascade: true,
  })
  @JoinColumn({ name: "category_food_id" })
  public category_food?: CategoryFood;

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default ProductFood;
