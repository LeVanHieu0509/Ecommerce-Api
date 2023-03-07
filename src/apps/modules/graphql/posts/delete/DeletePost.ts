import { Post } from "../../../entities/post.entity";
import { Arg, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { PostRepository } from "../../../../repositories/PostRepositories";

@Resolver((_type) => Post)
export class DeletePost {
  @Query((_type: any) => String!)
  public async deletePostById(@Arg("id") id: number): Promise<string> {
    const postRepository = getCustomRepository(PostRepository);
    const res = await postRepository.delete({ id: id });
    return res.toString();
  }
}
