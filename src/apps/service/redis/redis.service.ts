import { get, publish, sadd, set } from "../../../dbs/init.redis";

class RedisService {
  public static setPromise = async ({ key, value }) => {
    try {
      return await set({ key, value });

    } catch (e) {
      console.log(e);
    }
  };

  public static getPromise = async ({ key }) => {
    try {
      return await get({ key })
    } catch (e) {
      console.log(e);
    }
  };

  public static sADD = async ({ key, value }) => {
    try {
      return await sadd(key, value)
    } catch (e) {
      console.log(e);
    }
  };

  public static publishRedis = async ({ key, value }) => {
    try {
      return await publish("MESSAGES", { key, value })
    } catch (e) {
      console.log(e);
    }
  };

}

export default RedisService;
