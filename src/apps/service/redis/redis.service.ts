import redisClient from "../../../dbs/init.redis";
import ProductServiceTest from "../../tests/product.test";

class RedisService {
  public static setPromise = async ({ key, value }) => {
    try {

      return new Promise((isOkey, isError) => {
        redisClient.set(key, value, (error, res) => {
          return !error ? isOkey(res) : isError(error);
        });

      });
    } catch (e) {
      console.log(e);
    }
  };

  public static getPromise = async ({ key }) => {
    try {
      return new Promise((isOkey, isError) => {
        redisClient.get(key, (error, res) => {
          return !error ? isOkey(res) : isError(error);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export default RedisService;
