import RedisPubSubService from "../service/redis/redisPubsub.service"

class ProductServiceTest {
    purchaseProduct(productId, quantity) {
        const order = {
            productId,
            quantity
        }
        console.log("order", order)
        const redisPubSubService = new RedisPubSubService()

        redisPubSubService.publishRedis("purchase_events", JSON.stringify(order))
    }
}

export default ProductServiceTest