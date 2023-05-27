import { Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TipClothing, TipElectronics, TipProducts } from "./tip-product.entity";

@ObjectType()
@Entity()
export class TipShop {
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

  @Field((_type) => [TipProducts])
  @OneToMany((_type) => TipProducts, (tip_product: TipProducts) => tip_product.tip_shop)
  public tip_product!: TipProducts[];

  @Field((_type) => [TipClothing])
  @OneToMany((_type) => TipClothing, (tip_product: TipClothing) => tip_product.tip_shop)
  public tip_product_clothes!: TipClothing[];

  @Field((_type) => [TipElectronics])
  @OneToMany((_type) => TipElectronics, (tip_product: TipElectronics) => tip_product.tip_shop)
  public tip_product_electronics!: TipElectronics[];
}
export default TipShop;
