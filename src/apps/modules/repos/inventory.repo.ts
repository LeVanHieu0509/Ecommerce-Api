import { TipInventoryRepository } from "../../repositories/tip-js/TipInventoryRepositories";
const { getCustomRepository } = require("typeorm");

export const insertInventory = async ({ productId, shopId, stock, location }) => {
  const tipInventoryRepository = getCustomRepository(TipInventoryRepository);

  const inventory = await tipInventoryRepository.create({
    tip_product: productId,
    inven_stock: stock,
    tip_shop: shopId,
    inven_location: location,
  }); //this là những tham số ở trong contructor
  return await tipInventoryRepository.save(inventory);
};
