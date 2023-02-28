import * as bcrypt from "bcryptjs";
import { IsNotEmpty, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import Article from "./article.entity";
import Comment from "./comment.entity";
import { Post } from "./post.entity";

ObjectType();
@Entity()
@Unique(["email"])
export class User {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field()
  @Column({ type: "varchar" })
  @Length(4, 100)
  public username!: string;

  @Field()
  @Column({ type: "varchar" })
  @Length(4, 100)
  public email!: string;

  @Field()
  @Column({ type: "nvarchar" })
  @Length(4, 100)
  public password!: string;

  @Field()
  @Column({ type: "nvarchar" })
  @IsNotEmpty()
  public role!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => [Post])
  @OneToMany(() => Post, (post) => post.user)
  public posts!: Post[];

  @Field((_type) => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  public comments!: Comment[];

  @Field((_type) => [Article])
  @OneToMany(() => Article, (artcles) => artcles.user)
  public artcles!: Article[];

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
export default User;
