import { Service } from "typedi";
import { IsNotEmpty } from "class-validator";
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
import Comment from "./comment.entity";
import User from "./user.entity";
import Article from "./article.entity";

@Service()
@Entity()
@ObjectType() //Nó đánh dấu lớp là typeđã biết từ GraphQL SDL hoặc GraphQLObjectTypetừ graphql-js:
export class Post {
  // Sau đó, chúng tôi khai báo thuộc tính lớp nào sẽ được ánh xạ tới các trường GraphQL.
  // Để làm điều này, chúng tôi sử dụng @Field trình trang trí, cũng được sử dụng để thu thập siêu dữ liệu từ hệ thống phản ánh
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column()
  @IsNotEmpty()
  public title!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  public Stages?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public slug?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public featuredImage?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public excerpt?: string;

  @Field()
  @Column({ type: "nvarchar", nullable: true })
  public content?: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user: User) => user.post, {
    cascade: true,
  })
  @JoinColumn({ name: "user_id" })
  public user!: User;

  @Field((_type) => Comment)
  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  @JoinColumn({ name: "comment-id" })
  public comments?: Comment;

  @Field((_type) => Article)
  @OneToMany(() => Article, (article) => article.post, {
    cascade: true,
  })
  @JoinColumn({ name: "article-id" })
  public articles?: Article;

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
