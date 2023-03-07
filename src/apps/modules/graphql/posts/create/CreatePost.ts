import { UserRepository } from "../../../../repositories/UserRepositories";
import { PostRepository } from "../../../../repositories/PostRepositories";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import Post from "../../../entities/post.entity";
import { CreatePostInput } from "./CreatePostInput";

@Resolver((_type) => Post) //sẽ biến class CreateGroup thành một rest API
export class CreatePost {
  @Mutation((_type) => Post) //Định nghĩa method create Post thành một graphql mutation
  public async CreatePost(
    @Arg("data") inputData: CreatePostInput // @Arg: Sẽ đưa giá trị phía clent-side gửi lên params vào input data
  ): Promise<Post> {
    const userRepository = getCustomRepository(UserRepository);
    const user_id = await userRepository.findOne({
      where: { id: inputData.user_id },
    });
    const postRepository = getCustomRepository(PostRepository); //getCustomRepository: Sử dụng hàm này để tạo một thực thể và sử dụng các method của typeORM
    // và sử dụng các method của TypeOrm.
    const post = postRepository.create({
      title: inputData.title,
      text: inputData.text,
      url: inputData.url,
      user: user_id,
    });

    await postRepository.save(post);
    return post;
  }
}
