import crypto from "crypto";
import { ApiKeysRepository } from "./../repositories/food-app/ApiKeyRepositories";
import { getCustomRepository } from "typeorm";
import APIError from "../global/response/apierror";

const findById = async (key: string) => {
  try {
    const apiKeyRepository = getCustomRepository(ApiKeysRepository);

    // const newKey = await apiKeyRepository.create({
    //   key: crypto.randomBytes(64).toString("hex"),
    //   permissions: ["0000"],
    //   status: "1",
    // });

    // await apiKeyRepository.save(newKey);
    const objKey = await apiKeyRepository.findOne({ key, status: "1" });

    return objKey;
  } catch (error) {
    return new APIError(error, -2, 404);
  }
};

export default findById;
