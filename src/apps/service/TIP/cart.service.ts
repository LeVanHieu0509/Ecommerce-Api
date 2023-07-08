import { getCustomRepository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { NotFoundError } from "../../../core/error.response";
import { TipCart } from "./../../modules/entities/tip-cart.entity";
import { getProductById } from "./../../modules/repos/product.repo";
import { TipCartRepository } from "./../../repositories/tip-js/TipCartRepositories";

// cart service
// add product to cart [USER]
// reduce product quantity by one [USER]
// increase product quantity by one [USER]
// get cart [USER]
// Delete cart [USER]
// Delete cart item [USER]

class CartService {
  public static async createUserCart({ userId, product = {} }) {
    const tipCartRepository = getCustomRepository(TipCartRepository);

    const newCart = await tipCartRepository.create({
      user_food: userId,
      cart_products: JSON.stringify([product]),
      cart_state: "active",
    });

    const newCartResult = await tipCartRepository.save(newCart);

    return newCartResult;
  }

  public static async updateUserCartQuantity({ userId, product = {} }: any) {
    const { productId, quantity } = product;

    const tipCartRepository = getCustomRepository(TipCartRepository);

    const userCart = await tipCartRepository.findOne({ user_food: userId });

    const findItemCart = JSON.parse(userCart.cart_products).find((item) => item.productId == productId);
    findItemCart.quantity = quantity;

    const result = await tipCartRepository.update(
      { user_food: userId },
      { cart_products: JSON.stringify([findItemCart]) }
    );

    return {
      status: result.affected,
      message: "ok",
    };
  }

  public static async addToCart({ userId, product = {} }) {
    const tipCartRepository = getCustomRepository(TipCartRepository);

    const userCart = await tipCartRepository.findOne({
      user_food: userId,
    });

    if (!userCart) {
      //create cart for User
      return await this.createUserCart({ userId, product });
    }

    //neu co gio hang roi nhung ma nhung ma chua co san pham?
    if (!userCart.cart_products.length) {
      userCart.cart_products = JSON.stringify([product]);

      return await tipCartRepository.save(userCart);
    }
    return await tipCartRepository.save(userCart);
    // return await this.updateUserCartQuantity({ userId, product });
  }

  //
  static async addToCartV2({ userId, shop_order_ids }) {
    const { productId, quantity, old_quantity } = shop_order_ids[0]?.card_products[0];

    const foundProduct = await getProductById(productId);
    if (!foundProduct) throw new NotFoundError("Not Found Product");
    if (foundProduct.tip_shop !== shop_order_ids[0]?.shopId) {
      throw new NotFoundError("Product do not belong to the shop");
    }
    if (quantity === 0) {
      //deleted
    }
    return await this.updateUserCartQuantity({
      userId,
      product: {
        productId,
        quantity: quantity,
        old_quantity: old_quantity,
      },
    });
  }

  static async deleteUserCart({ userId, productId }) {
    const tipCartRepository = getCustomRepository(TipCartRepository);
    const query = { user_food: userId, cart_state: "active" };

    // Tìm và xóa phần tử trong mảng "cartProducts" có "productId" bằng "productId" và "user_food" bằng "userId"
    const foundCart = await tipCartRepository.findOne(query);
    const deleteEl = JSON.parse(foundCart.cart_products).filter((item) => item.productId !== productId);

    // Cập nhật mảng "cart_products" của thực thể "TipCart"
    const updateSet: QueryDeepPartialEntity<TipCart> = { cart_products: deleteEl };
    const deleteResult = await tipCartRepository.update(query, updateSet);

    return deleteResult;
  }

  static async getListUserCart({ userId }: any) {
    const tipCartRepository = getCustomRepository(TipCartRepository);

    const result = await tipCartRepository.findOne({ user_food: userId });
    result.cart_products = JSON.parse(result.cart_products);

    return result;
  }
}

export default CartService;
