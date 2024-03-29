import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class TipTemplate {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public tem_name!: string;

  @Field((_type) => String)
  @Column({ type: "text", nullable: true })
  public tem_html!: string;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true, default: "active" })
  public tem_status!: string;

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
