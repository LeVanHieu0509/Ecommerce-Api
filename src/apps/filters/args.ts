import { ArgsType, Field, InputType } from "type-graphql";

@ArgsType()
export default class BaseFilterArgs {
  @Field({ nullable: true })
  public orderByDesc?: string;

  @Field({ nullable: true })
  public orderByAsc?: string;

  @Field({ nullable: true })
  public skip?: number;

  @Field({ nullable: true })
  public take?: number;
}
