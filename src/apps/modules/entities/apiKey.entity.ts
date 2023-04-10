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
import UserFood from "./food_user";

@ObjectType()
@Entity()
export class ApiKey {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public key!: string;

  @Field((_type) => String)
  @Column({ type: "bit", nullable: true })
  public status!: string;

  @Field((_type) => String)
  @Column({ type: "simple-array", nullable: true })
  public permissions!: string[];

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
