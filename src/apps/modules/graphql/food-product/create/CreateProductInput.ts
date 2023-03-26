import { ProductFood } from "./../../../entities/food_product";
import { Field, InputType } from "type-graphql";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class CreateProductInput implements Partial<ProductFood> {
  //parameter input of post when create
  @Field()
  public title!: string;

  @Field()
  public description!: string;
  @Field()
  public image!: string;

  @Field()
  public price!: number;

  @Field()
  public category_id!: number;
}
