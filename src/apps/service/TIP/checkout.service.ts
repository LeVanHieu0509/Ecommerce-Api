import { getCustomRepository } from "typeorm";
import { BadRequestError } from "../../../core/error.response";
import { findCartById } from "./../../modules/repos/cart.repo";
import { checkProductByServer } from "./../../modules/repos/product.repo";
import { TipOrderRepository } from "./../../repositories/tip-js/TipOrderRepositories";
import DiscountService from "./discount.service";
import { acquireLock, releaseLock } from "./redis.service";

class CheckoutService {
  /*
        {
            cartId,
            userId,
            shop_order_ids: [
                {
                    shopId,
                    shop_discount:[],
                    item_products: {
                        price,
                        quantity,
                        productId
                    }
                },
                {               
                    shopId,
                    shop_discount:[
                        {
                            shopId,
                            discountId,
                            codeId
                        }
                    ],
                    item_products: {
                        price: 1000,
                        quantity: 2,
                        productId
                    }
                }
            ]
        }
  z  */

  static async checkoutReview({ cartId, userId, shop_order_ids }) {
    //check cartId ton tai khong
    const foundCart = await findCartById(cartId);

    if (!foundCart) throw new BadRequestError("Cart does not exists!");

    const checkout_order = {
        totalPrice: 0, // tong tien hang
        feeShip: 0, //phi van chuyen
        totalDiscount: 0, //tong tien discount giam gia
        totalCheckout: 0, //tong thanh toan
      },
      shop_order_ids_new = [];

    for (let i = 0; i < shop_order_ids.length; i++) {
      const { shopId, shop_discounts = [], item_products = [] } = shop_order_ids[i];

      const checkProductServer: any = await checkProductByServer(item_products);

      if (!checkProductServer[0]) throw new BadRequestError("order wrong");

      const checkoutPrice = checkProductServer.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);

      //tong tien truoc khi xu ly
      checkout_order.totalPrice = checkoutPrice;

      const itemCheckout = {
        shopId,
        shop_discounts,
        priceRaw: checkoutPrice,
        priceApplyDiscount: checkoutPrice,
        item_products: checkProductServer,
      };

      //neu shop_discount ton tai > 0, checkout xem co hop le hay khong
      if (shop_discounts.length > 0) {
        const { totalPrice = 0, discount = 0 } = await DiscountService.getDiscountAmount({
          codeId: shop_discounts[0].codeId,
          userId,
          shopId,
          products: checkProductServer,
        });

        //tong cong discount giam gia
        checkout_order.totalDiscount += discount;

        if (discount > 0) {
          itemCheckout.priceApplyDiscount = checkoutPrice - discount;
        }
      }

      //tong thanh toan cuoi cung
      checkout_order.totalCheckout += itemCheckout.priceApplyDiscount;
      shop_order_ids_new.push(itemCheckout);
    }

    return {
      shop_order_ids,
      shop_order_ids_new,
      checkout_order,
    };
  }

  public static async orderByUser({ shop_order_ids, cartId, userId, user_address, user_payment }) {
    const tipOrderRepository = getCustomRepository(TipOrderRepository);

    const { shop_order_ids_new, checkout_order } = await this.checkoutReview({
      cartId,
      userId,
      shop_order_ids,
    });

    //check lai mot lan nua co ton kho hay khong
    //get new array products

    const products = shop_order_ids_new.flatMap((order) => order.item_products);
    const accquireProduct = [];
    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];

      const keyLock = await acquireLock(productId, quantity, cartId);

      accquireProduct.push(keyLock ? true : false);

      if (keyLock) {
        await releaseLock(keyLock);
      }
      if (accquireProduct.includes(false)) {
        throw new BadRequestError("Mot so san pham dang duoc cap nhat, vui long quay lai gio hang...");
      }

      const newOrder = await tipOrderRepository.create({
        user_food: userId,
        order_checkout: JSON.stringify(checkout_order),
        order_shipping: JSON.stringify(user_address),
        order_payment: JSON.stringify(user_payment),
        order_product: JSON.stringify(shop_order_ids_new),
      });

      if (newOrder) {
        //remove
      }
    }
  }

  //1. query orders [USER]
  static async getOrdersByUser() {}

  //1. query orders use Id [USER]
  static async getOneOrdersByUser() {}

  //1. cancel orders [USER]
  static async getCancelOrdersByUser() {}

  //1. update orders [USER] [ADMIN]
  static async updateOrdersByUser() {}
}

export default CheckoutService;

//Làm thêm để luyện
//1. Review sản phẩm
//2. Comment 1 sản phẩm
//3. Quyền truy cập của user
//4.
