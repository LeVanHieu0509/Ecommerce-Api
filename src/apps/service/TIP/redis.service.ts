import { promisify } from "util";
import { reservationInventory } from "./../../modules/repos/inventory.repo";
const redis = require("redis");
//check san pham ton kho phai lon hon so luong user dat (sẽ sử dụng khoá bi quan để sài)

const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});
redisClient.on("connect", () => console.log("Redis Client Connect with URI"));
redisClient.on("error", (err) => console.log("Redis Client Error", err));

const pexpripe = promisify(redisClient.pExpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setNX).bind(redisClient);

const acquireLock = async (productId, quantity, cartId) => {
  const key = `lock_v2023_${productId}`;
  const retrtTimes: any = 10;
  const exprideTime = 3000;

  for (let i = 0; i < retrtTimes.length; i++) {
    const result = await setnxAsync(key, exprideTime);

    console.log(`result:::`, result);
    if (result === 1) {
      //thao tac voi inventory
      const isReservation = await reservationInventory({
        cartId,
        productId,
        quantity,
      });

      if (isReservation.affected) {
        await pexpripe(key, exprideTime);

        return key;
      }

      return null;
    } else {
      await new Promise((resolve) => setTimeout(() => resolve, 50));
    }
  }
};

const releaseLock = async (keylock) => {
  const delAsyncKey = promisify(redisClient.del).bind(redisClient);

  return await delAsyncKey(keylock);
};

export { acquireLock, releaseLock };
