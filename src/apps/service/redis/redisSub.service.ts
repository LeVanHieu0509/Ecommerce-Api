import redisClient from "../../../dbs/init.redis";
import client from "../../../dbs/init.redis";

class RedisSubService {
    subscriber: any;
    async subscriberRedis(channel, callback) {
        const redis = await redisClient()

        redis.SUBSCRIBE("purchase_events", function (err, reply) {
            if (err) {
                console.error("err", err);
            } else {
                console.log(`Subscribed to ${channel}: ${reply}`);
            }
        })




    }
}

export default RedisSubService