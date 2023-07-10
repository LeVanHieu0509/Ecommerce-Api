import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { TipInventoryRepository } from "../../repositories/tip-js/TipInventoryRepositories";
import { TipInventory } from "./../entities/tip-inventory.entity";
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

export const reservationInventory = async ({ productId, quantity, cartId }) => {
  const tipInventoryRepository = getCustomRepository(TipInventoryRepository);

  const query = {
    invent_productId: productId,
    invent_stock: { $gte: quantity },
  };

  // Tìm và xóa phần tử trong mảng "cartProducts" có "productId" bằng "productId" và "user_food" bằng "userId"
  const foundInventory = await tipInventoryRepository.findOne(query);

  const oldReserve = JSON.parse(foundInventory.inven_reservations);

  const listReservation = [
    ...oldReserve,
    {
      quantity,
      cartId,
      createOn: new Date(),
    },
  ];

  const updateSet: QueryDeepPartialEntity<TipInventory> = {
    inven_reservations: JSON.stringify(listReservation),
    inven_stock: foundInventory.inven_stock - quantity,
  };
  const result = await tipInventoryRepository.update(query, updateSet);

  //giam ton kho
  //dua tat ca cac user dat vao trong list dat cho
  return await result.affected;
};
