import { unGetSelectData } from "../../../ultis";
import { TipProductsRepository } from "../../repositories/tip-js/TipProductsRepositories";
import { TipProducts } from "./../entities/tip-product.entity";
const { getCustomRepository } = require("typeorm");

export const findAllDraftsForShopRepo = async ({ query, limit, skip }) => {
  return queryProduct({ query, limit, skip });
};

export const searchProductByUser = async ({ keySearch }): Promise<TipProducts[]> => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);

  const regexSearch = new RegExp(keySearch);
  const result = await tipProductsRepository.find({});

  console.log("regexSearch", regexSearch);
  console.log("keySearch", keySearch);

  const queryBuilder = tipProductsRepository.createQueryBuilder("tip_product");
  const products = await queryBuilder
    .where("tip_product.product_name LIKE :product_name", { product_name: `%${keySearch}%` })
    .getMany();
  return products;
};

export const findAllPublishedForShopRepo = async ({ query, limit, skip }) => {
  return queryProduct({ query, limit, skip });
};

export const publishProductByShopRepo = async ({ tip_shop, product_id }) => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);
  const foundShop = await tipProductsRepository.findOne({
    tip_shop: tip_shop,
    id: product_id,
  });

  if (!foundShop) return null;

  const result = await tipProductsRepository.update(
    { id: product_id, tip_shop: tip_shop },
    { isDraft: false, isPublished: true }
  );

  return result.affected;

  //cach 2
  // const responseDb = await tipProductsRepository
  //   .createQueryBuilder()
  //   .update(foundShop)
  //   .set({ isDraft: false, isPublished: true })
  //   .where("id = :id", { id: product_id })
  //   .execute();
  //return responseDb.affected;
};

export const unPublishProductByShopRepo = async ({ tip_shop, product_id }) => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);
  const foundShop = await tipProductsRepository.findOne({
    tip_shop: tip_shop,
    id: product_id,
  });

  if (!foundShop) return null;

  const result = await tipProductsRepository.update(
    { id: product_id, tip_shop: tip_shop },
    { isDraft: true, isPublished: false }
  );

  return result.affected;
};

export const findAllProductsRepo = async ({ limit, sortOrder, sortBy, page, filter, select, priceMin, priceMax }) => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);

  const queryBuilder = tipProductsRepository.createQueryBuilder("tip_product");

  if (priceMin && priceMax) {
    queryBuilder.andWhere("tip_product.product_price BETWEEN :priceMin AND :priceMax", { priceMin, priceMax });
  } else if (priceMin) {
    queryBuilder.andWhere("tip_product.product_price >= :priceMin", { priceMin });
  } else if (priceMax) {
    queryBuilder.andWhere("tip_product.product_price <= :priceMax", { priceMax });
  }

  // Sort by column and orde

  // Sort by column and order
  if (sortBy && sortOrder) {
    queryBuilder.orderBy(`tip_product.${sortBy}`, sortOrder.toUpperCase());
  }
  // Select specific columns
  if (select) {
    let selectFileds = select.map((item) => {
      return `tip_product.${item}`;
    });
    queryBuilder.select(selectFileds);
  }

  // Filter by isPublished
  if (filter) {
    queryBuilder.andWhere("tip_product.isPublished = :isPublished", filter);
  }

  // Limit and offset
  const skip = (page - 1) * limit;
  queryBuilder.skip(skip).take(limit);

  // Execute query and count total records
  const [products, total] = await queryBuilder.getManyAndCount();

  return [products, total];
};

export const findProductsRepo = async ({ product_id, unSelect }) => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);

  return await tipProductsRepository.find(
    {
      id: product_id,
    },
    {
      select: unGetSelectData(unSelect),
    }
  );
};

export const queryProduct = async ({ query, limit, skip }) => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);
  return await tipProductsRepository.find(query, {
    relations: ["tip_shop"],
    skip: skip,
    limit: limit,
  });
};
