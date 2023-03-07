import { PostRepository } from "../../../../repositories/PostRepositories";
import { getCustomRepository } from "typeorm";
import { Post } from "../../../entities/post.entity";
import { Arg, Mutation, Resolver } from "type-graphql";
import { UpdatePostInput } from "./UpdatePostInput";

@Resolver((_type) => Post)
export class UpdatePost {
  @Mutation((_type) => Post)
  public async updatePost(
    @Arg("data") inputData: UpdatePostInput
  ): Promise<Post> {
    const postRepository = getCustomRepository(PostRepository);
    await postRepository.update(
      { id: inputData.user_id },
      {
        text: inputData.text,
        title: inputData.title,
        url: inputData.url,
      }
    );

    return postRepository.findOneOrFail(inputData.user_id);
  }
}
