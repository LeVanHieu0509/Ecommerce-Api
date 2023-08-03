import RedisSubService from "../service/redis/redisSub.service"

class InventoryServiceTest {
    async subscriberRedis() {
        const redisPubSubService = new RedisSubService()

        await redisPubSubService.subscriberRedis("purchase_events", (channel, message) => {
            console.log("receiver redis:", message)
        })
    }
}

export default InventoryServiceTest