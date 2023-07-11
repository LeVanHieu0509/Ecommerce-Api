import client from "../../../dbs/init.redis";

class RedisService {
  public static setPromise = async ({ key, value }) => {
    try {
      return new Promise((isOkey, isError) => {
        client.set(key, value, (error, res) => {
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
        client.get(key, (error, res) => {
          return !error ? isOkey(res) : isError(error);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export default RedisService;
