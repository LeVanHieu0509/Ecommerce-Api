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
import { TipProducts } from "./tip-product.entity";
import TipShop from "./tip-shop.entity";

@ObjectType()
@Entity()
export class TipInventory {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar" })
  public inven_location!: string;

  @Field()
  @Column({ type: "int" })
  public inven_stock!: number;

  @Field()
  @Column({ type: "varchar" })
  public inven_reservations!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => TipProducts)
  @ManyToOne(() => TipProducts, (tip_product) => tip_product.tip_inventory, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_product_id" })
  public tip_product?: TipProducts;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (tip_shop) => tip_shop.tip_inventory, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_shop_id" })
  public tip_shop?: TipShop;
}
export default TipInventory;
