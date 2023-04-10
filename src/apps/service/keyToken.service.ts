import { getCustomRepository } from "typeorm";
import { KeysRepository } from "../repositories/food-app/KeysRepositories";

class KeyTokenService {
  public static createKeyToken = async ({ userId, publicKey }) => {
    try {
      const publicKeyString = publicKey.toString();
      const keysRepository = getCustomRepository(KeysRepository);
      const tokens = await keysRepository.create({
        user_food: userId,
        publicKey: publicKeyString,
      });

      await keysRepository.save(tokens);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

export default KeyTokenService;
