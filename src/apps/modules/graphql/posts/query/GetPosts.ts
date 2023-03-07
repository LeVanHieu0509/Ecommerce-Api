import { PostRepository } from "../../../../repositories/PostRepositories";
import { Post } from "../../../entities/post.entity";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Info,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";
import { GraphQLResolveInfo } from "graphql";
import PostFilterArgs from "./postArgs";

@Resolver((_type) => Post)
export class GetPosts {
  constructor(
    @InjectRepository() // Sẽ tự động tạo thực thể categoryRepository qua hàm xây dựng. Tuỳ vào mục đích chúng ta sẽ chọn cách phù hợp
    private readonly postRepository: PostRepository
  ) {}

  @Query((_type) => [Post]) // Định nghĩa như là method GetPosts như là một graphql
  public async getPosts123(): Promise<Post[]> {
    const posts = await this.postRepository.find();
    return posts;
  }

  @Query((_type) => [Post]) // Định nghĩa như là method GetPosts như là một graphql
  public async feed(
    @Root() post: Post,
    @Args(() => PostFilterArgs) { take, skip }: PostFilterArgs,
    @Ctx() { conn }: any,
    @Info() info: GraphQLResolveInfo
  ): Promise<Post[]> {
    console.log("args", post.id, take);

    const user = await conn.db.query.post({
      skip: skip,
      take: take,
    });
    // const posts = await this.postRepository.find({
    //   skip: skip,
    //   take: take,
    // });

    return user;
  }

  @Query((_type) => [Post]) // Định nghĩa như là method GetPosts như là một graphql
  public async postFindById(@Arg("id") id: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });

    return post;
  }

  @Query((_type) => [Post]) // Định nghĩa như là method GetPosts như là một graphql
  public async feedTest123(
    @Root() post: Post,
    @Arg("take") take: number,
    @Arg("skip") skip: number,
    @Ctx() { conn }: any,
    @Info() info: GraphQLResolveInfo
  ): Promise<Post[]> {
    const user = await this.postRepository.find({
      skip: skip,
      take: take,
    });

    return user;
  }
}
