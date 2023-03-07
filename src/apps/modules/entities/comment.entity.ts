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
import Article from "./article.entity";
import Post from "./post.entity";
import User from "./user.entity";

@ObjectType()
@Entity()
export class Comment {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({ type: "varchar", nullable: true })
  public text!: string;

  @Field((_type) => User)
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "user-id" })
  public user!: User;

  @Field((_type) => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "post-id" })
  public post!: Post;

  @Field((_type) => Article)
  @ManyToOne(() => Article, (articles) => articles.comment)
  @JoinColumn({ name: "articles-id" })
  public articles!: Article;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;
}

export default Comment;
