import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum OTP_STATUS {
  PENDING = "pending",
  ACTIVE = "active",
  BLOCK = "block",
}

@ObjectType()
@Entity({
  synchronize: true,
})
export class TipOtp {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public id!: number;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public otp_token!: string;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true })
  public otp_email!: string;

  @Field((_type) => String)
  @Column({ type: "varchar", nullable: true, default: "pending", enum: OTP_STATUS })
  public otp_status!: string;

  @Column({ type: "datetime", nullable: true })
  @Index({ expireAfterSeconds: 60 })
  expired: Date = new Date();

  @Field()
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
