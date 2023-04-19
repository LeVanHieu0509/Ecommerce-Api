import { buildSchema } from "type-graphql";
import { GetCategory } from "./food-category/query/GetProduct";
import { CheckoutOrder } from "./food-checkout/create/CreateCheckout";
import { CreateFavorite } from "./food-favorite/create/CreateFavorite";
import { GetFavoriteFood } from "./food-favorite/query/GetFavorites";
import { CreateProduct } from "./food-product/create/CreateProduct";
import { AuthFood } from "./food-user/query/Auth-Food";

import { CreateCategory } from "./food-category/create/CreateCategory";
import { CreateOrder } from "./food-order/create/CreateOrder";
import { DeleteOrder } from "./food-order/delete/DeleteOrder";
import { GetOrdersFood } from "./food-order/query/GetOrders";
import { GetProduct } from "./food-product/query/GetProduct";

export default (Container: any) => {
  return buildSchema({
    container: Container,
    resolvers: [
      AuthFood,

      CreateCategory,
      GetCategory,

      CreateProduct,
      GetProduct,

      CreateOrder,
      GetOrdersFood,
      DeleteOrder,

      CheckoutOrder,

      CreateFavorite,
      GetFavoriteFood,
    ],
    emitSchemaFile: true,
    validate: false,
  });
};
