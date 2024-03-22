import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import TipUser from "./tip-user.entity";

// const rol_grants = [
//   {
//     role: "admin",
//     resource: "profile",
//     action: "update:any",
//     attributes: "*",
//   },
//   {
//     role: "admin",
//     resource: "balance",
//     action: "update:any",
//     attributes: "*, !mount",
//   },

//   {
//     role: "shop",
//     resource: "profile",
//     action: "update:any",
//     attributes: "*",
//   },
//   {
//     role: "shop",
//     resource: "balance",
//     action: "update:any",
//     attributes: "*, !mount",
//   },

//   {
//     role: "user",
//     resource: "profile",
//     action: "update:any",
//     attributes: "*",
//   },
//   {
//     role: "user",
//     resource: "balance",
//     action: "update:any",
//     attributes: "*",
//   },
// ];

@ObjectType()
@Entity()
export class TipRole {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true, default: "user", enum: ["user", "shop", "admin"] })
  public rol_name!: string; // profile

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public rol_slug!: string; //00007 -- kí tự show ra cho người dùng để cho người dùng đoán nó là gì.

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true, default: "active", enum: ["active", "block", "pending"] })
  public rol_status!: string; //string

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public rol_description!: string; //string

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public rol_grants!: string; //object

  @Field((_type) => TipUser)
  @OneToMany(() => TipUser, (tip_user) => tip_user.tip_role)
  public tip_user!: TipUser[];

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
