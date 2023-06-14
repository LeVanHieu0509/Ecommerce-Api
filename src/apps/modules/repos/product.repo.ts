import { TipProductsRepository } from "../../repositories/tip-js/TipProductsRepositories";

const { getCustomRepository } = require("typeorm");

export const findAllDraftsForShopRepo = async ({ query, limit, skip }) => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);
  console.log("query", query);
  return await tipProductsRepository.find(query, {
    relations: ["tip_shop"],
    skip: skip,
    limit: limit,
  });
};
