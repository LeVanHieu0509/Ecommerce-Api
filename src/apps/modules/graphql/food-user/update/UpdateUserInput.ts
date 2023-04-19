import { Field, InputType } from "type-graphql";
import UserFood from "../../../entities/food_user";

@InputType()
export class UpdateUserInput implements Partial<UserFood> {
  @Field({ nullable: true })
  public id?: number;

  @Field({ nullable: true })
  public email?: string;

  @Field({ nullable: true })
  public password?: string;
}
