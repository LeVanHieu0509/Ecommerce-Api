import { getCustomRepository } from "typeorm";
import { BadRequestError, NotFoundError } from "../../../core/error.response";
import { findAllProductsRepo } from "./../../modules/repos/product.repo";
import { TipDiscountRepository } from "./../../repositories/tip-js/TipDiscountRepositories";

class DiscountService {
  static tipDiscountRepository = getCustomRepository(TipDiscountRepository);

  static async createDiscountCode(payload) {
    const {
      code,
      start_date,
      end_date,
      is_active,
      shop_id,
      min_order_value,
      product_ids,
      applies_to,
      name,
      description,
      type,
      value,
      max_value,
      max_uses,
      uses_count,
      users_used,
      max_uses_per_user,
    } = payload;

    //kiem tra
    if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
      throw new BadRequestError("Discound code has expried!");
    }

    //
    if (new Date(start_date) >= new Date(end_date)) {
      throw new BadRequestError("Start date must be before end date");
    }
    //create index for discount code
    const foundDiscount = await this.tipDiscountRepository.findOne({
      discount_code: code,
      tip_shop: shop_id,
    });

    if (foundDiscount && foundDiscount.discount_is_active) {
      throw new BadRequestError("Discount exists");
    }

    const newDiscount = await this.tipDiscountRepository.create({
      discount_name: name,
      discount_description: description,
      discount_type: type,
      discount_code: code,
      discount_value: value,
      discount_min_order_value: min_order_value || 0,
      discount_max_value: max_value,
      discount_start_date: start_date,
      discount_end_date: end_date,
      discount_max_uses: max_uses,
      discount_uses_count: uses_count,
      discount_users_used: JSON.stringify(users_used),
      discount_applies_to: applies_to,
      discount_is_active: is_active,
      discount_max_uses_per_user: max_uses_per_user,
      tip_shop: shop_id,
      discount_product_ids: JSON.stringify(product_ids),
    });

    return newDiscount;
  }

  static async updateDiscountCode(payload) {}

  //get all discount codes available with products

  static async getAllDiscountCodeWithProduct({ code, shopId, userId, limit, page }) {
    //create index for discount_code
    const foundDiscount = await this.tipDiscountRepository.findOne({
      discount_code: code,
      tip_shop: shopId,
    });

    if (!foundDiscount || !foundDiscount.discount_is_active) {
      throw new NotFoundError("Discount not exists!");
    }

    const { discount_applies_to, discount_product_ids } = foundDiscount;
    let products;

    if (discount_applies_to == "all") {
      products = await findAllProductsRepo({
        filter: {
          tip_shop: shopId,
          isPublished: true,
        },
        limit: +limit,
        page: +page,
        sortBy: "ctime",
        select: ["product_name"],
      });
    }

    if (discount_applies_to == "specific") {
      products = await findAllProductsRepo({
        filter: {
          // sua lai
          id: JSON.parse(discount_product_ids),
          isPublished: true,
        },
        limit: +limit,
        page: +page,
        sortBy: "ctime",
        select: ["product_name"],
      });
    }
  }

  //section 21
  //get all discount code of shop
  static async getAllDiscountCodeWithShop({ limit, page, shopId }) {
    //     const discounts = await findAllDiscountCodeUnSelect({
    //         limit: +limit,
    //         page: +page,
    //         filter: {
    //             tip_shop: shopId,
    //             discount_is_active: true,
    //         }
    //         unSelect: ["shop_id"],
    //         modal: this.tipDiscountRepository
    //     })
  }
}
