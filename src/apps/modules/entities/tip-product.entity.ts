import { Max, Min } from "class-validator";
import slugify from "slugify";

import { Field, ObjectType } from "type-graphql";
import { Service } from "typedi";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TypeProduct } from "./../../@custom-type/enum";
import { TipShop } from "./tip-shop.entity";

@ObjectType()
class SlugtifiedProductName {
  @Field(() => String)
  product_slug: string;
}

@Service()
@Entity()
@ObjectType() //Nó đánh dấu lớp là type đã biết từ GraphQL SDL hoặc GraphQLObjectTypetừ graphql-js:
export class TipProducts {
  // Sau đó, chúng tôi khai báo thuộc tính lớp nào sẽ được ánh xạ tới các trường GraphQL.
  // Để làm điều này, chúng tôi sử dụng @Field trình trang trí, cũng được sử dụng để thu thập siêu dữ liệu từ hệ thống phản ánh
  //@Index("POST_NAME_INDEX", { synchronize: false })
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public product_name!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public product_thumb!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public product_description!: string;

  @Field()
  @Column({ type: "float", nullable: true })
  public product_price!: number;

  @Field((type) => SlugtifiedProductName)
  @Column({ type: "nvarchar", nullable: true })
  public product_slug?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async slugtifyProductName() {
    // slugify from product name
    this.product_slug = slugify(this.product_name, { lower: true });
  }

  @Field()
  @Column({ type: "int", nullable: true })
  public product_quantity!: number;

  @Field()
  @Column({ type: "varchar", nullable: true, enum: TypeProduct })
  public product_type!: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public product_attributes!: string;

  @Field()
  @Min(1)
  @Max(5)
  @Column({ type: "float", nullable: true, default: 4.5 })
  private product_ratingsAverage: number;
  set _product_ratingsAverage(value: number) {
    // Hash password before setting
    this.product_ratingsAverage = Math.round(this.product_ratingsAverage * 10) / 10;
  }
  get _product_ratingsAverage(): number {
    return this.product_ratingsAverage;
  }

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public product_variations!: string;

  @Field()
  @Index()
  @Column({ type: "bit", nullable: true, default: 1, select: false }) //select là khi find ra nó không lấy gía trị này
  public isDraft!: boolean;

  @Field()
  @Index()
  @Column({ type: "bit", nullable: true, default: 0, select: false }) //select là khi find ra nó không lấy gía trị này
  public isPublished!: boolean;

  //key reference
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
  @OneToMany((_type) => TipClothing, (tip_product: TipClothing) => tip_product.tip_product)
  public tip_product_clothes!: TipClothing[];

  @Field((_type) => [TipElectronics])
  @OneToMany((_type) => TipElectronics, (tip_product: TipElectronics) => tip_product.tip_product)
  public tip_product_electronics!: TipElectronics[];

  @Field((_type) => [TipFurniture])
  @OneToMany((_type) => TipFurniture, (tip_product: TipFurniture) => tip_product.tip_product)
  public tip_product_furniture!: TipFurniture[];
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

  @Field((_type) => TipProducts)
  @ManyToOne(() => TipProducts, (tip_product) => tip_product.tip_product_clothes, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_product_id" })
  public tip_product?: TipProducts;
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

  @Field((_type) => TipProducts)
  @ManyToOne(() => TipProducts, (tip_product) => tip_product.tip_product_electronics, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_product_id" })
  public tip_product?: TipProducts;
}

@Entity()
@ObjectType()
export class TipFurniture {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public brand?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public size?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public material?: string;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (tip_shop) => tip_shop.tip_product_furniture, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_shop_id" })
  public tip_shop?: TipShop;

  @Field((_type) => TipProducts)
  @ManyToOne(() => TipProducts, (tip_product) => tip_product.tip_product_furniture, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_product_id" })
  public tip_product?: TipProducts;
}
