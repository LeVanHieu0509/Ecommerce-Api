import { Field, InputType } from "type-graphql";
import { User } from "../../../entities/User.entity";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class CreateUserInput implements Partial<User> {
  //parameter input of User when create
  @Field()
  public username!: string;

  @Field()
  public password!: string;

  @Field()
  public role!: string;

  @Field()
  public email!: string;
}
