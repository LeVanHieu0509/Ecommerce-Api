const redis = require("redis");
//check san pham ton kho phai lon hon so luong user dat (sẽ sử dụng khoá bi quan để sài)

const client = redis.createClient({
  url: process.env.REDIS_URI,
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

client.ping((e, value) => {
  console.log("ping", value);
});

const connect = async () => {
  await client.connect().catch(console.error);
};

connect();

export default client;
