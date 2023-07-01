import { getCustomRepository } from "typeorm";
import { BadRequestError, NotFoundError } from "../../../core/error.response";
import { findAllDiscountCodesSelect } from "../../modules/repos/discount.repo";
import { TipDiscountRepository } from "../../repositories/tip-js/TipDiscountRepositories";
import { checkDiscountExists } from "./../../modules/repos/discount.repo";
import { findAllProducts } from "./../../modules/repos/product.repo";

class DiscountService {
  public static async createDiscountCode(payload) {
    const tipDiscountRepository = getCustomRepository(TipDiscountRepository);
    const {
      code,
      start_date,
      end_date,
      is_active,
      shopId,
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
    // if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
    //   throw new BadRequestError("Discound code has expried!");
    // }

    //
    if (new Date(start_date) >= new Date(end_date)) {
      throw new BadRequestError("Start date must be before end date");
    }
    //create index for discount code
    const foundDiscount = await tipDiscountRepository.findOne({
      discount_code: code,
      tip_shop: shopId,
    });

    if (foundDiscount && foundDiscount.discount_is_active) {
      throw new BadRequestError("Discount exists");
    }

    const newDiscount = await tipDiscountRepository.create({
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
      tip_shop: shopId,
      discount_product_ids: JSON.stringify(product_ids),
    });
    const res = await tipDiscountRepository.save(newDiscount);

    return res;
  }

  public static async updateDiscountCode(payload) {}

  //get all discount codes available with products

  public static async getAllDiscountCodeWithProduct({ code, shopId, limit, page }: any) {
    //create index for discount_code
    const tipDiscountRepository = getCustomRepository(TipDiscountRepository);

    const foundDiscount = await tipDiscountRepository.findOne({
      discount_code: code,
      tip_shop: shopId,
    });

    if (!foundDiscount || !foundDiscount.discount_is_active) {
      throw new NotFoundError("Discount not exists!");
    }

    const { discount_applies_to, discount_product_ids } = foundDiscount;
    let products;

    if (discount_applies_to == "all") {
      products = await findAllProducts({
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
      products = await findAllProducts({
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

    return products;
  }

  //section 21
  //get all discount code of shop
  public static async getAllDiscountCodeWithShop({ limit, page, shopId }: any) {
    const tipDiscountRepository = getCustomRepository(TipDiscountRepository);

    const discounts = await findAllDiscountCodesSelect({
      limit: +limit,
      page: +page,
      filter: {
        tip_shop: shopId,
        discount_is_active: true,
      },
      select: ["discount_name", "discount_description", "discount_code"],
      modal: tipDiscountRepository,
    });

    return discounts;
  }

  ///apply discount code voucher shop
  //product = [
  //   {
  //     productId,
  //     shopId,
  //     quantity,
  //     name,
  //     price
  //   }
  // ]

  public static async getDiscountAmount({ codeId, userId, shopId, products }: any) {
    const tipDiscountRepository = getCustomRepository(TipDiscountRepository);

    const foundDiscount = await checkDiscountExists({
      filter: {
        discount_code: codeId,
        tip_shop: shopId,
      },
      modal: tipDiscountRepository,
    });

    if (!foundDiscount) {
      throw new NotFoundError("Discount do not exists");
    }

    const {
      discount_type,
      discount_value,
      discount_is_active,
      discount_max_uses,
      discount_start_date,
      discount_end_date,
      discount_min_order_value,
      discount_max_uses_per_user,
      discount_users_used,
    } = foundDiscount;

    if (!discount_is_active) throw new NotFoundError("Discount exists");
    if (!discount_max_uses) throw new NotFoundError("Discount exists");

    if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
      throw new NotFoundError("Discount code has expried");
    }

    //check xem discount co gia toi thieu hay không
    let totalOrder = 0;
    if (discount_min_order_value > 0) {
      totalOrder = products.reduce((acc, product) => {
        return acc + product.quantity * product.price;
      }, 0);

      if (totalOrder < discount_min_order_value) {
        throw new NotFoundError(`Discount requires a minium order value of ${discount_min_order_value}`);
      }
    }

    if (discount_max_uses_per_user > 0) {
      const userDiscount = JSON.parse(discount_users_used).find((user) => user.userId === userId);
      if (userDiscount) {
        //.....
      }
    }

    const amount = discount_type === "fixed_amount" ? discount_value : totalOrder * (discount_value / 100);

    return {
      totalOrder,
      discount: amount,
      totalPrice: totalOrder - amount,
    };
  }

  //Xoa thi sẽ đưa vào history (ưu tiên sử dụng case này hơn.)
  // case: sẽ đánh dấu trong 1 field nào đó để.

  //delete discount
  // Nếu đang được ở đâu thì phải xoá nó trước rồi mới xoá
  public static async deleteDiscountCode({ shopId, codeId }) {
    const tipDiscountRepository = getCustomRepository(TipDiscountRepository);
    //cach 1: Tim duoc thi moi xoa
    //code

    //cach 2:
    const deleted = await tipDiscountRepository.delete({ tip_shop: shopId, discount_code: codeId });

    return deleted.toString();
  }

  public static async cancelDiscount({ shopId, codeId, userId }) {
    const tipDiscountRepository = getCustomRepository(TipDiscountRepository);

    const foundDiscount = await checkDiscountExists({
      filter: {
        discount_code: codeId,
        tip_shop: shopId,
      },
      modal: tipDiscountRepository,
    });

    if (foundDiscount) throw new NotFoundError("discount doesn't exist");

    const result = await tipDiscountRepository.update(
      {
        discount_users_used: userId,
      },
      {
        discount_max_uses: 1,
        discount_uses_count: -1,
      }
    );

    return result;
  }
}

export default DiscountService;
