import { getCustomRepository } from "typeorm";
import { BadRequestError } from "../../core/error.response";
import { TipClothingRepository } from "../repositories/tip-js/TipClothingRepositories";
import { TipElectronicsRepository } from "./../repositories/tip-js/TipElectronicsRepositories";
import { TipProductsRepository } from "./../repositories/tip-js/TipProductsRepositories";
//define Factory class to create product

//use design partern factory
class ProductFactory {
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
    const newClothing = await this.tipClothingRepository.create(JSON.parse(this.attributes));
    await this.tipClothingRepository.save(newClothing);

    if (!newClothing) throw new BadRequestError("Create new Clothing error");

    const newProduct = await super.createProduct();

    if (!newProduct) throw new BadRequestError("Create new Product error");

    return newProduct;
  }
}

//define sub class
class Electronics extends Product {
  tipElectronRepository = getCustomRepository(TipElectronicsRepository);
  async createElectronic() {
    const newElectronic = await this.tipElectronRepository.create(this.attributes);
    await this.tipElectronRepository.save(newElectronic);

    if (!newElectronic) throw new BadRequestError("Create new Electronic error");

    const newProduct = await super.createProduct();
    if (!newProduct) throw new BadRequestError("Create new Electronic error");

    return newProduct;
  }
}

export default ProductFactory;
