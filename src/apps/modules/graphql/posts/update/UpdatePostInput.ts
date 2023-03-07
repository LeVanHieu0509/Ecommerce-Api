import { Post } from "../../../entities/post.entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePostInput implements Partial<Post> {
  @Field()
  public title!: string;

  @Field()
  public url!: string;

  @Field()
  public text!: string;

  @Field()
  public user_id!: number;
}
