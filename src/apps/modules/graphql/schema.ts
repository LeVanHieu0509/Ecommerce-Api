import { buildSchema } from "type-graphql";
import { CreateProduct } from "./food-product/create/CreateProduct";
import { AuthFood } from "./food-user/query/Auth-Food";

import { CreateCategory } from "./food-category/create/CreateCategory";
import { CreateOrder } from "./food-order/create/CreateOrder";
import { GetProduct } from "./food-product/query/GetProduct";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [
      AuthFood,
      CreateCategory,
      CreateProduct,
      GetProduct,
      CreateOrder,
    ],
    emitSchemaFile: true,
    validate: false,
  });
};
