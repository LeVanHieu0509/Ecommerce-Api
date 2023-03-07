import { Post } from "../../../entities/post.entity";
import { Field, InputType } from "type-graphql";


//Class này nhằm để định nghĩa được dữ liệu đầu vào của graphql
@InputType() //@InputType sẽ sinh ra kiểu GraphQLInputType
export class CreatePostInput implements Partial<Post> {
  //parameter input of post when create
  @Field()
  public title!: string;

  @Field()
  public url!: string;

  @Field()
  public text!: string;

  @Field()
  public user_id!: number;
}
