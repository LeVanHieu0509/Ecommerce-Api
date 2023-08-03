import { createClient } from "redis";
//check san pham ton kho phai lon hon so luong user dat (sẽ sử dụng khoá bi quan để sài)

const redisClient: any = async () => {
  // client = redis.createClient({ url: process.env.REDIS_URI, legacyMode: true });

  let client = createClient({
    password: "AQYsqtdaIM2tYXCV7KOpoOWB3IC8tF4r",
    socket: {
      host: "redis-11856.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
      port: 11856,
    },
    legacyMode: true,
  });

  client.on("connect", () => console.log("Redis Client Connect with URI"));
  client.on("error", (err) => console.log("Redis Client Error", err));

  // Khi client đã kết nối tới Redis server
  client.on("ready", () => {
    console.log("Redis client is ready to use");
  });

  // Khi client đã bị đóng kết nối tới Redis server
  client.on("end", () => {
    console.log("Redis client has disconnected");
  });

  // client.ping((e, value) => {
  //   console.log("ping", value);
  // });

  await client.connect().catch((e) => console.log(e));
  return client
};



export default redisClient;
