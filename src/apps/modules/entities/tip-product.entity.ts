import { Field, ObjectType } from "type-graphql";
import { Service } from "typedi";
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
import { TypeProduct } from "./../../@custom-type/enum";
import { TipShop } from "./tip-shop.entity";

@Service()
@Entity()
@ObjectType() //Nó đánh dấu lớp là typeđã biết từ GraphQL SDL hoặc GraphQLObjectTypetừ graphql-js:
export class TipProducts {
  // Sau đó, chúng tôi khai báo thuộc tính lớp nào sẽ được ánh xạ tới các trường GraphQL.
  // Để làm điều này, chúng tôi sử dụng @Field trình trang trí, cũng được sử dụng để thu thập siêu dữ liệu từ hệ thống phản ánh
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public name!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public thumb!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public description!: string;

  @Field()
  @Column({ type: "float", nullable: true })
  public price!: number;

  @Field()
  @Column({ type: "int", nullable: true })
  public quantity!: number;

  @Field()
  @Column({ type: "varchar", nullable: true, enum: TypeProduct })
  public type!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public attributes!: string;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (categoty_food) => categoty_food.tip_product, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_shop_id" })
  public tip_shop?: TipShop;

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => [TipClothing])
  @OneToMany((_type) => TipClothing, (tip_product: TipClothing) => tip_product.tip_shop)
  public tip_product_clothes!: TipClothing[];

  @Field((_type) => [TipElectronics])
  @OneToMany((_type) => TipElectronics, (tip_product: TipElectronics) => tip_product.tip_shop)
  public tip_product_electronics!: TipElectronics[];
}

///

@Entity()
@ObjectType()
export class TipClothing {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public brand!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public size?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public material?: string;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (tip_shop) => tip_shop.tip_product_clothes, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_shop_id" })
  public tip_shop?: TipShop;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (tip_product) => tip_product.tip_product_clothes, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_product_id" })
  public tip_product?: TipShop;
}

@Entity()
@ObjectType()
export class TipElectronics {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public manufacturer!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public modal?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public color?: string;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (tip_shop) => tip_shop.tip_product_electronics, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_shop_id" })
  public tip_shop?: TipShop;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (tip_product) => tip_product.tip_product_electronics, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_product_id" })
  public tip_product?: TipShop;
}
