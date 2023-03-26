import { Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
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
import { Comment } from "./comment.entity";
import Post from "./post.entity";
import User from "./user.entity";

@ObjectType()
@Entity()
export class Article {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar" })
  @Length(0, 100)
  public slug!: string;

  @Field()
  @Column({ type: "varchar" })
  @Length(4, 100)
  public name!: string;

  @Field()
  @Column({ type: "varchar" })
  @Length(4, 100)
  public bio!: string;

  @Field()
  @Column({ type: "varchar" })
  @Length(4, 100)
  public content!: string;

  @Field()
  @Column({ type: "varchar" })
  public tagList!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => Number)
  @Column({ type: "int" })
  public favoriteCount!: number;

  @Field((_type) => [User])
  @ManyToOne(() => User, (user) => user.artcles)
  public user!: User;

  @Field((_type) => [Comment])
  @OneToMany(() => Comment, (comment) => comment.articles)
  @JoinColumn({ name: "comment-id" })
  public comment!: Comment[];

  @Field((_type) => [Post])
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "post-id" })
  public post!: Post[];
}
export default Article;
