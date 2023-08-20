const amqp = require('amqplib')

const messages = 'RabittMq with queue test-topic from project';

const runProducerRabbit = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        const queueName = 'test-topic'
        await channel.assertQueue(queueName, {
            durable: true,
        })

        //send massages to consumer channel
        channel.sendToQueue(queueName, Buffer.from(messages),{
            persistent: true, //Liên tục được lưu vào ổ đĩa và cache.
            expiration: '10000'
        })
        console.log('message sent:', messages)
    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

const runProducerRabbitPublish = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        await channel.assertExchange("video", "fanout", {
            durable: true
        })

        return await channel.publish("video", "", Buffer.from("anh hieu dep trai qua"))
    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

const runProducerRabbitPublishYoutobe = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        await channel.assertExchange("youtobe", "fanout", {
            durable: true
        })

        return await channel.publish("youtobe", "", Buffer.from("anh hieu dep trai qua"))
    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

runProducerRabbit()
runProducerRabbitPublish()
runProducerRabbitPublishYoutobe()