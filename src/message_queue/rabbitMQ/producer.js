const amqp = require('amqplib')

const messages = 'hello, RabittMq for hieu le 123';

const runProducerRabbit = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        const queueName = 'test-topic'
        await channel.assertQueue(queueName, {
            durable: true,
        })

        //send massages to consumer channel
        channel.sendToQueue(queueName, Buffer.from(messages))
        console.log('message sent:', messages)
    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

runProducerRabbit()