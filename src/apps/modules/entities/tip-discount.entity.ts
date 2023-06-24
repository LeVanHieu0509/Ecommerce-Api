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
import { TypeDiscountApplyTo } from "./../../@custom-type/enum";
import { TipShop } from "./tip-shop.entity";

@ObjectType()
@Entity()
export class TipDiscount {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar" })
  public discount_name!: string;

  @Field()
  @Column({ type: "varchar" })
  public discount_description!: string;

  @Field()
  @Column({ type: "varchar", default: "fixed_amount" }) //percentage
  public discount_type!: string;

  @Field()
  @Column({ type: "float" }) //percentage
  public discount_value!: number;

  @Field()
  @Column({ type: "float" }) //percentage
  public discount_max_value!: number;

  @Field()
  @Column({ type: "varchar", default: "fixed_amount" }) //percentage
  public discount_code!: string;

  @Field()
  @Column({ type: "datetime" })
  public discount_start_date!: Date;

  @Field()
  @Column({ type: "datetime" })
  public discount_end_date!: Date;

  @Field()
  @Column({ type: "int" })
  public discount_max_uses!: number; //so luong discount duoc su dung

  @Field()
  @Column({ type: "int" })
  public discount_uses_count!: number; //so discount da su dung

  @Field()
  @Column({ type: "nvarchar" })
  public discount_users_used!: string; //ai da su dung => Array

  @Field()
  @Column({ type: "int" })
  public discount_max_uses_per_user!: number; //so luong cho phep toi da su dung moi user

  @Field()
  @Column({ type: "float" })
  public discount_min_order_value!: number;

  @Field()
  @Column({ type: "bit" })
  public discount_is_active!: boolean;

  @Field()
  @Column({ type: "varchar", enum: TypeDiscountApplyTo })
  public discount_applies_to!: string;

  @Field()
  @Column({ type: "varchar" })
  public discount_product_ids!: string; // neu la specific thi can them 1 mang san pham duoc ap dung ==> array

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => TipShop)
  @ManyToOne(() => TipShop, (tip_shop) => tip_shop.tip_discount, {
    cascade: true,
  })
  @JoinColumn({ name: "tip_shop_id" })
  public tip_shop?: TipShop;
}

export default TipDiscount;
