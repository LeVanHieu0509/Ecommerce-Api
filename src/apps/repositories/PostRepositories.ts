import { Post } from "./../modules/entities/post.entity";
import { EntityRepository, Repository } from "typeorm";

//Mục đích của tạo repo là để có thể sử dụng được các method của TypeORM
// Và định nghĩa thêm nhiều method khác tuỳ vào mục  đích sử dụng
//
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}
