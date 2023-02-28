import { IsNotEmpty } from "class-validator";
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
import Comment from "./comment.entity";
import User from "./user.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column()
  @IsNotEmpty()
  public title!: string;

  @Field()
  @Column({ type: "varchar" })
  public url!: string;

  @Field()
  @Column({ type: "varchar" })
  public text!: string;

  @Field((_type) => [User])
  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user-id" })
  public user!: User;

  @Field((_type) => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  public comments!: Comment[];

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default Post;
