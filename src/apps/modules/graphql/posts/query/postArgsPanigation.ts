import { Post } from "./../../../entities/post.entity";
import { ArgsType, Field, ID, InputType } from "type-graphql";

@InputType()
@ArgsType()
export default class PostArgsPanigation {
  @Field({ nullable: true })
  public take?: number;

  @Field({ nullable: true })
  public skip?: string;
}
