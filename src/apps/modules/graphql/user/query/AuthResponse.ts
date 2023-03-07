import { User } from "./../../../entities/user.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class AuthResponse {
  @Field((_type) => User)
  public user!: Omit<User, "password">;

  @Field()
  public access_token!: string;
}
