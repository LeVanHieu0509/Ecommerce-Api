import { getCustomRepository } from "typeorm";
import { KeysRepository } from "../repositories/food-app/KeysRepositories";

class KeyTokenService {
  public static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const userRepository = getCustomRepository(KeysRepository);
      const tokens = await userRepository.create({
        user_food: userId,
        publicKey: publicKeyString,
      });

      return tokens ? publicKeyString : null;
    } catch (error) {
      return error;
    }
  };
}

export default KeyTokenService;
