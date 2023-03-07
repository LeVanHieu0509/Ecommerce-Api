import { DeletePost } from "./posts/delete/DeletePost";
import { UpdatePost } from "./posts/update/UpdatePost";
import { buildSchema } from "type-graphql";
import { CreatePost } from "./posts/create/CreatePost";

import { GetPosts } from "./posts/query/GetPosts";
import { Auth } from "./user/query/Auth";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [Auth],
    emitSchemaFile: true,
    validate: false,
  });
};
