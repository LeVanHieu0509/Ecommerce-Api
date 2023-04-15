import { getCustomRepository } from "typeorm";
import { KeysRepository } from "../repositories/food-app/KeysRepositories";

class KeyTokenService {
  public static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      //vip
      const filter = { user_food: userId };
      const publicKeyString = publicKey.toString();
      const privateKeyString = privateKey.toString();

      const keysRepository = getCustomRepository(KeysRepository);

      const tokens = await keysRepository.create({
        ...filter,
        publicKey: process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY,
        privatekey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
        refreshTokensUsed: [],
        refreshToken,
      });
      await keysRepository.save(tokens);

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  public static findByUserId = async (userId: any) => {
    const keysRepository = getCustomRepository(KeysRepository);
    const keys = await keysRepository.findOne({ user_food: userId });
    return keys;
  };

  public static removeKeyById = async (id) => {
    const keysRepository = getCustomRepository(KeysRepository);
    const deleteKey = await keysRepository.remove(id);
    return deleteKey;
  };
}

export default KeyTokenService;
