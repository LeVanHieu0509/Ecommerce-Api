import { getCustomRepository } from "typeorm";
import { BadRequestError } from "../../../core/error.response";
import { TipProductsRepository } from "../../repositories/tip-js/TipProductsRepositories";
import { TipClothingRepository } from "./../../repositories/tip-js/TipClothingRepositories";
import { TipElectronicsRepository } from "./../../repositories/tip-js/TipElectronicsRepositories";
//define Factory class to create product

//use design partern factory
class ProductFactory {
  //type
  //payload
  static async createProduct(type: any, payload: any) {
    switch (type) {
      case "Electronics":
        return new Electronics(payload).createElectronic();
      case "Clothing":
        return new Clothing(payload).createClothing();
      default:
        throw new BadRequestError(`Invalid Product Types ${type}`);
    }
  }
}

class Product {
  attributes: any;
  name: any;
  thumb: any;
  description: any;
  price: any;
  quantity: any;
  type: any;
  tip_shop: any;
  createdAt: any;
  updatedAt: any;
  tipProductsRepository = getCustomRepository(TipProductsRepository);

  constructor({ name, thumb, description, price, quantity, type, attributes, tip_shop, createdAt, updatedAt }) {
    this.name = name;
    this.thumb = thumb;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
    this.attributes = JSON.stringify(attributes);
    this.tip_shop = tip_shop;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async createProduct() {
    const product = await this.tipProductsRepository.create(this); //this là những tham số ở trong contructor
    return await this.tipProductsRepository.save(product);
  }
}

//define sub class
class Clothing extends Product {
  brand: string;
  size: string;
  material: string;

  tipClothingRepository = getCustomRepository(TipClothingRepository);

  async createClothing() {
    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("Create new Product error");

    const clothing = await this.tipClothingRepository.create({
      ...JSON.parse(this.attributes),
      tip_product: newProduct.id,
      tip_shop: this.tip_shop,
    });

    const newClothing = await this.tipClothingRepository.save(clothing);

    if (!newClothing) throw new BadRequestError("Create new Clothing error");

    return newProduct;
  }
}

//define sub class
//id product la khoa ngoai cua bang electronic
//id shop la khoa ngoai cua cua cua bang electronic

class Electronics extends Product {
  tipElectronRepository = getCustomRepository(TipElectronicsRepository);
  async createElectronic() {
    const newProduct = await super.createProduct();

    if (!newProduct) throw new BadRequestError("Create new Electronic error");

    const electronic = await this.tipElectronRepository.create({
      ...JSON.parse(this.attributes),
      tip_shop: this.tip_shop,
      tip_product: newProduct.id,
    });

    const newElectronic = await this.tipElectronRepository.save(electronic);
    if (!newElectronic) throw new BadRequestError("Create new Electronic error");

    return newProduct;
  }
}

export default ProductFactory;
