import { User } from "./../../../entities/user.entity";
import { Post } from "../../../entities/post.entity";
import { Field, InputType } from "type-graphql";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class SigninInput implements Partial<User> {
  //parameter input of post when create
  @Field()
  public username!: string;

  @Field()
  public email!: string;

  @Field()
  public password!: string;

  @Field()
  public role!: string;
}
