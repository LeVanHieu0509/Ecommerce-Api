import * as bcrypt from "bcryptjs";
import { IsNotEmpty, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import Article from "./article.entity";
import Comment from "./comment.entity";
import { Post } from "./post.entity";
import { TipRole } from "./tip-role.entity";

@ObjectType()
@Entity()
export class TipUser {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public usr_id!: number;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @Length(4, 100)
  public usr_slug!: string; //id ảo của user là id đại diện. Ngừoi ta chỉ biết là abc, xyz thôi.

  @Field()
  @Column()
  @Length(4, 100)
  public usr_name!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  public usr_password!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @IsNotEmpty()
  public usr_salf!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @IsNotEmpty()
  public usr_email!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @IsNotEmpty()
  public usr_phone!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @IsNotEmpty()
  public usr_sex!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @IsNotEmpty()
  public usr_avatar!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @IsNotEmpty()
  public usr_date_of_birth!: string;

  @Field()
  @Column({ type: "varchar", nullable: true })
  @IsNotEmpty()
  public usr_role!: string;

  @Field()
  @Column({ type: "date", nullable: true, enum: ["pending", "active", "block"] })
  @IsNotEmpty()
  public usr_status!: string;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;

  @Field((_type) => [Post])
  @OneToMany((_type) => Post, (post: Post) => post.user)
  public post!: Post[];

  @Field((_type) => Comment)
  @OneToMany(() => Comment, (comment) => comment.user)
  public comments!: Comment[];

  @Field((_type) => Article)
  @OneToMany(() => Article, (artcles) => artcles.user)
  public artcles!: Article[];

  @Field((_type) => TipRole)
  @ManyToOne(() => TipRole, (tip_role) => tip_role.tip_user, {
    cascade: true,
  })
  @JoinColumn({ name: "user_role" })
  public tip_role?: TipRole;

  public hashPassword() {
    this.usr_password = bcrypt.hashSync(this.usr_password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.usr_password);
  }
}
export default TipUser;
