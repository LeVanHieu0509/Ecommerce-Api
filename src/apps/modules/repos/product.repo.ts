import { In } from "typeorm";
import { getSelectData, unGetSelectData } from "../../../ultis";
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

export const findAllProductsRepo = async ({
  limit,
  sortOrder,
  sortBy,
  page,
  filter,
  select,
  priceMin,
  priceMax,
}: any) => {
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
    let { isPublished, id } = filter ?? {};
    if (id) {
      queryBuilder.andWhere("tip_product.id = :id", { id: filter.id });
    }
    if (isPublished) {
      queryBuilder.andWhere("tip_product.isPublished = :isPublished", { isPublished: filter.isPublished });
    }
  }

  // Limit and offset
  const skip = (page - 1) * limit;
  queryBuilder.skip(skip).take(limit);

  // Execute query and count total records
  const [products, total] = await queryBuilder.getManyAndCount();

  return [products, total];
};

//cach 2
export const findAllProducts = async ({ limit, sortOrder, sortBy, page, filter, select, priceMin, priceMax }: any) => {
  const productRepository = getCustomRepository(TipProductsRepository);

  const where: any = {};

  if (priceMin && priceMax) {
    where.product_price = { between: [priceMin, priceMax] };
  } else if (priceMin) {
    where.product_price = { gte: priceMin };
  } else if (priceMax) {
    where.product_price = { lte: priceMax };
  }

  if (filter) {
    const { isPublished, id } = filter;
    if (id) {
      where.id = In(id);
    }
    if (isPublished) {
      where.isPublished = isPublished;
    }
  }

  const order: any = {};
  if (sortBy && sortOrder) {
    order[sortBy] = sortOrder.toUpperCase();
  }

  const options = {
    select: getSelectData(select),
    where,
    order,
    skip: (page - 1) * limit,
    take: limit,
  };

  const [products, total] = await productRepository.findAndCount(options);

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

export const updateProductsByIdRepo = async ({
  productId,
  repository,
  payload,
  isNew = true,
}: {
  productId: number;
  repository: any;
  payload: any;
  isNew?: any;
}) => {
  return await repository.update(
    {
      id: productId,
    },
    payload
  );
};

export const getProductById = async ({ productId }) => {
  const tipProductsRepository = getCustomRepository(TipProductsRepository);

  return await tipProductsRepository.findOne({ id: productId });
};

export const checkProductByServer = async (products: any) => {
  return await Promise.all(
    products.map(async (product) => {
      const foundProduct = await getProductById({ productId: product.productId });

      if (foundProduct) {
        return {
          price: foundProduct.product_price,
          quantity: product.quantity,
          productId: product.productId,
        };
      }
    })
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
