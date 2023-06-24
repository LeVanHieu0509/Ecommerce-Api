import { Field, InputType } from "type-graphql";
import { UserFood } from "../../../entities/food_user";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class SigninInput implements Partial<UserFood> {
  //parameter input of post when create
  @Field()
  public username!: string;

  @Field()
  public password!: string;
}
