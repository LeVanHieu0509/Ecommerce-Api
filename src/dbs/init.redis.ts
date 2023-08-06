import * as dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
//check san pham ton kho phai lon hon so luong user dat (sẽ sử dụng khoá bi quan để sài)

const resolvePromise = (resolve, reject) => {
  return (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
    console.log("data", data)
  };
};

let cli: any;

(async () => {
  cli = createClient({
    password: process.env.PASS_WORD_REDIS,
    socket: {
      host: process.env.HOST_REDIS,
      port: +process.env.PORT_REDIS,
    },
    legacyMode: true,
  });
  cli.on("connect", () => console.log("Redis Client Connected"));
  await cli.connect().catch((e) => console.log(e));
})();

export const clientSub = async () => {
  let sub: any = createClient({
    password: process.env.PASS_WORD_REDIS,
    socket: {
      host: process.env.HOST_REDIS,
      port: +process.env.PORT_REDIS,
    },

  });

  sub.on("connect", () => console.log("Redis Client sub Connected"));
  await sub.connect().catch((e) => console.log(e));

  return sub
}


export const publish = async (type, data) => {
  const outgoing = {
    type,
    data,
  };
  return new Promise((a, b) => {
    return cli.publish("MESSAGES", JSON.stringify(outgoing), resolvePromise(a, b))
  });
};

/*
  get: 
  set: Có thể lưu được dạng html (Không được lớn hơn 512Mb)
    set key value nx
      - nx: Nếu khoá đã tồn tại thì không được set vào
      - xx: Override luôn.
*/
export const get = ({ key = "key" }: { key: string }) =>
  new Promise((a, b) => {
    cli.get(key, resolvePromise(a, b))
  });

export const set = ({ key = "key", value, option = "xx" }: any) =>
  new Promise((a, b) => {
    cli.set(key, value, option, resolvePromise(a, b))
  });

export const incr = (key = "key") =>
  new Promise((a, b) => cli.incr(key, resolvePromise(a, b)));

export const decr = (key = "key") =>
  new Promise((a, b) => cli.decr(key, resolvePromise(a, b)));

export const hSet = (key = "key", values = []) =>
  new Promise((a, b) => cli.hSet(key, values, resolvePromise(a, b)));

export const exists = (key = "key") =>
  new Promise((a, b) => cli.exists(key, resolvePromise(a, b)));

export const hexists = (key = "key", key2 = "") =>
  new Promise((a, b) => cli.hExists(key, key2, resolvePromise(a, b)));

export const hgetall = (key = "key") =>
  new Promise((a, b) => cli.hGetAll(key, resolvePromise(a, b)));

export const zrangebyscore = (key = "key", min = 0, max = 1) =>
  new Promise((a, b) =>
    cli.zRangeByScore(key, min, max, resolvePromise(a, b))
  );

export const zadd = (key = "key", key2 = "", value) =>
  new Promise((a, b) => cli.zAdd(key, key2, value, resolvePromise(a, b)));

export const sadd = (key = "key", value) =>
  new Promise((a, b) => cli.sAdd(key, value, resolvePromise(a, b)));

export const hmget = (key = "key", key2 = "") =>
  new Promise((a, b) => cli.hmGet(key, key2, resolvePromise(a, b)));

export const sismember = (key = "key", key2 = "") =>
  new Promise((a, b) => cli.sIsMember(key, key2, resolvePromise(a, b)));

export const smembers = (key = "key") =>
  new Promise((a, b) => cli.sMembers(key, resolvePromise(a, b)));

export const srem = (key = "key", key2 = "") =>
  new Promise((a, b) => cli.sRem(key, key2, resolvePromise(a, b)));

export { cli };
