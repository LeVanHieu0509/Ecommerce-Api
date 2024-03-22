import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class TipResource {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public src_name!: string; // profile

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public src_slug!: string; //00001

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public src_description!: string; //object

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
