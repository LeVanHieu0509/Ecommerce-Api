import { Field, InputType } from "type-graphql";
import { OrderFood } from "../../../entities/food_order";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class CreateCheckoutInput {
  //parameter input of post when create
  @Field()
  public status!: string;

  @Field()
  public bill_price!: number;

  @Field()
  public user_id!: number;
}
