import { Field, InputType } from "type-graphql";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class DeleteOrderInput {
  //parameter input of post when create
  @Field()
  public id_favorite!: number;
}
