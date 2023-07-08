import { BadRequestError } from "../../../core/error.response";
import { findCartById } from "./../../modules/repos/cart.repo";
import { checkProductByServer } from "./../../modules/repos/product.repo";
import DiscountService from "./discount.service";

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
    */

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
}

export default CheckoutService;
