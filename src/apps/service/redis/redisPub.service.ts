import redisClient from "../../../dbs/init.redis";

class RedisPubService {


    publisher: any;

    async publishRedis(channel, message) {
        const redis = await redisClient()

        redis.PUBLISH(channel, message, (err: any, reply: any) => {
            if (err) {
                console.log(`err: ${err}`)
            }
            else {
                console.log(`PUBLISH to ${channel}: ${reply}`)
            }

        })


    }
}

export default RedisPubService