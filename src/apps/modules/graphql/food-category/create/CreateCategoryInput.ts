import { Post } from "../../../entities/post.entity";
import { Field, InputType } from "type-graphql";

//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class CreateCategoryInput implements Partial<Post> {
  //parameter input of post when create
  @Field()
  public title!: string;

  @Field()
  public image!: string;
}
