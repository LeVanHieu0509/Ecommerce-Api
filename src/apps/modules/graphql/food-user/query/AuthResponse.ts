import { Field, ObjectType } from "type-graphql";
import { User } from "../../../entities/user.entity";

@ObjectType()
export default class AuthResponse {
  @Field((_type) => User)
  public user!: Omit<User, "password">;

  @Field()
  public access_token!: string;
}
