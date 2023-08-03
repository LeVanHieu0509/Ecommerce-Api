import RedisPubService from "../service/redis/redisPub.service"
import RedisPubSubService from "../service/redis/redisPub.service"

class ProductServiceTest {
    async purchaseProduct(productId, quantity) {
        const order = {
            productId,
            quantity
        }
        console.log("order", order)
        const redisPubSubService = new RedisPubService()

        await redisPubSubService.publishRedis("purchase_events", JSON.stringify(order))
    }
}

export default ProductServiceTest