import { buildSchema } from "type-graphql";
import { GetCategory } from "./food-category/query/GetProduct";
import { CreateProduct } from "./food-product/create/CreateProduct";
import { AuthFood } from "./food-user/query/Auth-Food";

import { CreateCategory } from "./food-category/create/CreateCategory";
import { CreateOrder } from "./food-order/create/CreateOrder";
import { GetOrdersFood } from "./food-order/query/GetOrders";
import { GetProduct } from "./food-product/query/GetProduct";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [AuthFood, CreateCategory, GetCategory, CreateProduct, GetProduct, CreateOrder, GetOrdersFood],
    emitSchemaFile: true,
    validate: false,
  });
};
