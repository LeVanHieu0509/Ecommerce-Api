import { Field, InputType } from "type-graphql";
import { OrderFood } from "./../../../entities/food_order";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class CreateOrderInput {
  //parameter input of post when create
  @Field()
  public product_id!: number;

  @Field()
  public user_id!: number;
}
