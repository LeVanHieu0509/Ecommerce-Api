import { getCustomRepository } from "typeorm";
import { TipCartRepository } from "./../../repositories/tip-js/TipCartRepositories";

export const findCartById = async (cartId) => {
  const tipCartRepository = getCustomRepository(TipCartRepository);

  return await tipCartRepository.find({ id: cartId, cart_state: "active" });
};
