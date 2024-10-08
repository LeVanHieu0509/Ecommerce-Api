import { getCustomRepository } from "typeorm";
import { BadRequestError } from "../../../core/error.response";
import { updateNestedObjectParser } from "./../../../ultis/index";
import { insertInventory } from "./../../modules/repos/inventory.repo";
import {
  findAllDraftsForShopRepo,
  findAllProductsRepo,
  findAllPublishedForShopRepo,
  findProductsRepo,
  publishProductByShopRepo,
  searchProductByUser,
  unPublishProductByShopRepo,
} from "./../../modules/repos/product.repo";
import { TipClothingRepository } from "./../../repositories/tip-js/TipClothingRepositories";
import { TipElectronicsRepository } from "./../../repositories/tip-js/TipElectronicsRepositories";
import { TipFurnitureRepository } from "./../../repositories/tip-js/TipFurnitureRepositories";
import { TipProductsRepository } from "./../../repositories/tip-js/TipProductsRepositories";
import { pushNotiToSystem } from "./notification.service";

//define Factory class to create product

//use design partern factory
class ProductFactoryLvXXX {
  //stragy
  static productRegistry = {}; //key class

  //Mỗi lần có một class mới thì sẽ tạo mới.

  static registerProductType(product_type, classRef) {
    ProductFactoryLvXXX.productRegistry[product_type] = classRef;
  }

  //type
  //payload
  static async createProduct(product_type: any, payload: any) {
    const productClass = ProductFactoryLvXXX.productRegistry[product_type];
    if (!productClass) throw new BadRequestError(`Invalid Product Types ${product_type}`);

    return new productClass(payload).createProduct();
  }

  static async updateProduct(product_type: any, productId: any, payload: any) {
    const productClass = ProductFactoryLvXXX.productRegistry[product_type];
    if (!productClass) throw new BadRequestError(`Invalid Product Types ${product_type}`);

    return new productClass(payload).updateProduct(productId);
  }

  //PUT
  static async publishProductByShop({ tip_shop, product_id }) {
    return await publishProductByShopRepo({ tip_shop, product_id });
  }

  static async unPublishProductByShop({ tip_shop, product_id }) {
    return await unPublishProductByShopRepo({ tip_shop, product_id });
  }

  //query
  static async findAllDraftsForShop({ tip_shop, limit = 50, skip = 0 }) {
    const query = { tip_shop, isDraft: true };
    return await findAllDraftsForShopRepo({ query, limit, skip });
  }

  static async findAllPublishedForShop({ tip_shop, limit = 50, skip = 0 }) {
    const query = { tip_shop, isPublished: true };
    return await findAllPublishedForShopRepo({ query, limit, skip });
  }

  static async searchProduct({ keySearch }: any) {
    return await searchProductByUser({ keySearch });
  }

  static async findAllProduct({
    limit = 50,
    sortOrder,
    sortBy = "ctime",
    page = 1,
    filter = { isPublished: true },
    select = ["product_name", "product_thumb", "product_price", "product_slug"],
    priceMin,
    priceMax,
  }: any) {
    return await findAllProductsRepo({
      limit,
      sortOrder,
      sortBy,
      page,
      filter,
      select,
      priceMin,
      priceMax,
    });
  }

  static async getProduct({ product_id }) {
    return await findProductsRepo({ product_id, unSelect: ["updatedAt"] });
  }

  // static async findProduct({ tip_shop, limit = 50, skip = 0 }: any) {
  //   return await findAllProductsRepo({ tip_shop, limit = 50, skip = 0 });
  // }
}

class Product {
  product_attributes: any;
  product_name: any;
  product_thumb: any;
  product_description: any;
  product_price: any;
  product_quantity: any;
  product_type: any;
  product_slug: any;
  tip_shop: any;
  createdAt: any;
  updatedAt: any;
  tipProductsRepository = getCustomRepository(TipProductsRepository);

  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_attributes,
    tip_shop,
    createdAt,
    updatedAt,
    product_slug,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_attributes = JSON.stringify(product_attributes);
    this.tip_shop = tip_shop;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.product_slug = product_slug;
  }

  async createProduct() {
    const product = await this.tipProductsRepository.create(this); //this là những tham số ở trong contructor
    const newProduct = await this.tipProductsRepository.save(product);

    if (newProduct) {
      await insertInventory({
        productId: newProduct.id,
        shopId: this.tip_shop,
        stock: this.product_quantity,
        location: "",
      });

      //push noti pto system collection
      pushNotiToSystem({
        type: "SHOP-001",
        receivedId: 1,
        senderId: this.tip_shop,
        options: {
          productName: this.product_name,
          shop_name: this.tip_shop,
        },
      })
        .then((res) => console.log("res", res))
        .catch((e) => console.log(e));
    }

    return newProduct;
  }

  async updateProduct(productId) {
    //this là những tham số ở trong contructor
    // return await this.tipProductsRepository.update({ id: productId }, payload);

    const product = await this.tipProductsRepository.update(
      {
        id: productId,
      },
      updateNestedObjectParser({
        product_name: this.product_name,
        product_price: this.product_price,
        product_attributes: this.product_attributes,
      })
    );

    return product;
  }
}

//define sub class
class Clothing extends Product {
  brand: string;
  size: string;
  material: string;

  tipClothingRepository = getCustomRepository(TipClothingRepository);

  async createProduct() {
    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("Create new Product error");

    const clothing = await this.tipClothingRepository.create({
      ...JSON.parse(this.product_attributes),
      tip_product: newProduct.id,
      tip_shop: this.tip_shop,
    });

    const newClothing = await this.tipClothingRepository.save(clothing);

    if (!newClothing) throw new BadRequestError("Create new Clothing error");

    return newProduct;
  }

  async updateProduct(productId) {
    const newProduct = await super.updateProduct(productId);

    if (!newProduct) throw new BadRequestError("UPDATE new Product error");

    //1. remove attribute has null undefined

    if (this.product_attributes) {
      //update child
      await this.tipClothingRepository.update(
        {
          tip_product: productId,
        },
        updateNestedObjectParser({
          ...JSON.parse(this.product_attributes),
        })
      );

      // await updateProductsByIdRepo({ productId, repository: , payload: objectParams });
    }

    return newProduct;
  }
}

//define sub class
//id product la khoa ngoai cua bang electronic
//id shop la khoa ngoai cua cua cua bang electronic

class Electronics extends Product {
  tipElectronRepository = getCustomRepository(TipElectronicsRepository);
  async createProduct() {
    const newProduct = await super.createProduct();

    if (!newProduct) throw new BadRequestError("Create new Electronic error");

    const electronic = await this.tipElectronRepository.create({
      ...JSON.parse(this.product_attributes),
      tip_shop: this.tip_shop,
      tip_product: newProduct.id,
    });

    const newElectronic = await this.tipElectronRepository.save(electronic);
    if (!newElectronic) throw new BadRequestError("Create new Electronic error");

    return newProduct;
  }
}

class Furniture extends Product {
  tipFurnitureRepository = getCustomRepository(TipFurnitureRepository);
  async createProduct() {
    const newProduct = await super.createProduct();

    if (!newProduct) throw new BadRequestError("Create new Furniture error");

    const furniture = await this.tipFurnitureRepository.create({
      ...JSON.parse(this.product_attributes),
      tip_shop: this.tip_shop,
      tip_product: newProduct.id,
    });

    const newFurniture = await this.tipFurnitureRepository.save(furniture);
    if (!newFurniture) throw new BadRequestError("Create new Furniture error");

    return newProduct;
  }
}

//register product types
ProductFactoryLvXXX.registerProductType("Electronics", Electronics);
ProductFactoryLvXXX.registerProductType("Clothings", Clothing);
ProductFactoryLvXXX.registerProductType("Furniture", Furniture);

export default ProductFactoryLvXXX;
