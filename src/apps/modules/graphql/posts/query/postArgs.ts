import { Post } from "./../../../entities/post.entity";
import { ArgsType, Field, ID, InputType } from "type-graphql";
import BaseFilterArgs from "../../../../filters/args";

@InputType()
@ArgsType()
export default class PostFilterArgs
  extends BaseFilterArgs
  implements Partial<Post>
{
  @Field(() => ID, { nullable: true })
  public id?: number;

  @Field({ nullable: true })
  public title?: string;
}
