import RedisPubSubService from "../service/redis/redisPubsub.service"

class InventoryServiceTest {
    constructor() {
        const redisPubSubService = new RedisPubSubService()
        redisPubSubService.subscriberRedis("purchase_events", (channel, message) => {
            console.log("receiver redis:", message)
            InventoryServiceTest.updateInventory(message)
        })
    }

    static updateInventory({ productId, quantity }) {
        console.log(`Update inventory: ${productId} with quantity: ${quantity}`)
    }
}

export default InventoryServiceTest