import { getCustomRepository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BadRequestError } from "../../../core/error.response";
import { TipInventory } from "./../../modules/entities/tip-inventory.entity";
import { getProductById } from "./../../modules/repos/product.repo";
import { TipInventoryRepository } from "./../../repositories/tip-js/TipInventoryRepositories";
class InventoryService {
  static async addStockToInventory({ stock, productId, shopId, location = "123 abc xyz" }) {
    const tipInventoryRepository = getCustomRepository(TipInventoryRepository);

    const product = await getProductById(productId);
    const query = { tip_shop: shopId, tip_product: productId };

    if (product) throw new BadRequestError("The product does not exists");

    const updateSet: QueryDeepPartialEntity<TipInventory> = {
      inven_location: location,
      inven_stock: stock,
    };

    return await tipInventoryRepository.update(query, updateSet);
  }
}

export default InventoryService;
