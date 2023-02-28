import { AppDataSource } from "../../data-source";
import APIError from "../global/response/apierror";
import Err from "../global/response/errorcode";
import { User } from "../modules/entities/user.entity";
import { IUser } from "../models/User";
import { IUserRepository } from "./UserRepository";
import Post from "../modules/entities/post.entity";

export class PostService {
  async get(): Promise<Post[] | null> {
    // Get users from database
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const posts = await postRepository.find();
      return posts;
    } catch (error) {
      return null;
    }
  }
  async getOneById(id: any): Promise<Post | null> {
    const postsRepository = AppDataSource.getRepository(Post);
    try {
      const posts = await postsRepository.findOneBy(id);
      return posts;
    } catch (error) {
      return null;
    }
  }

  async add(model: any, userId): Promise<Post | null> {
    const { title, url, text } = model;
    const post = new Post();
    post.title = title;
    post.url = url;
    post.text = text;
    post.user = userId;

    const userRepository = AppDataSource.getRepository(Post);
    try {
      const savedUser = await userRepository.save(post);
      return savedUser;
    } catch (e) {
      console.log(e);
      return Promise.reject(
        new APIError("post not exists", Err.EmailAlreadyExists)
      );
    }
  }
  async delete(id: any): Promise<User | null> {
    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneBy(id);
      if (user) {
        userRepository.delete(id);
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async edit(model: any, userId: any, idPost: any): Promise<Post[] | null> {
    const { title, url, text } = model;

    const userRepository = AppDataSource.getRepository(User);
    const postRepository = AppDataSource.getRepository(Post);

    let post;
    try {
      post = await postRepository.findOneOrFail(idPost);
    } catch (error) {
      return null;
    }
    post.title = title;
    post.url = url;
    post.text = text;

    try {
      const newPost = await postRepository.save(post);
      return newPost;
    } catch (error) {
      return null;
    }
  }
}
