const amqp = require('amqplib')


const runConsumerRabbit = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        const queueName = 'test-topic'
        await channel.assertQueue(queueName, {
            durable: true,
        })

        //send massages to consumer channel
        channel.consume(queueName, (mag) => {
            console.log(`Received ${mag.content.toString()}`)
        }, {
            noAck: true //Đã xử lý rồi thì không nhận nữa
        })
    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

runConsumerRabbit()