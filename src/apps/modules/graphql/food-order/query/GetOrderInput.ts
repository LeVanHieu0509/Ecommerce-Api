import { Field, InputType } from "type-graphql";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class GetOrderInput {
  //parameter input of post when creat

  @Field()
  public user_id!: number;
}
