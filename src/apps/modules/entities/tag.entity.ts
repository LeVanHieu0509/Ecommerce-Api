import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class Tag {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar" })
  @IsNotEmpty()
  public tag!: string;
}
