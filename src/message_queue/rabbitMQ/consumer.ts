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

const runConsumerRabbitExchange = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        await channel.assertExchange("video", "fanout", {
            durable: true
        })

        const { queue } = await channel.assertQueue("", {
            exclusive: true //Khi mà user ko đăng kí nữa thì sẽ xoá đi trong hàng đợi.
        })

        await channel.bindQueue(queue, "video", "")

        await channel.consume(queue, msg => {
            console.log("msg received:: ", msg.content.toString())

        },
            {
                noAck: true
            })

    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

const runConsumerRabbitExchangeYoutobe = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        await channel.assertExchange("youtobe", "fanout", {
            durable: true
        })

        const { queue } = await channel.assertQueue("", {
            exclusive: true //Khi mà user ko đăng kí nữa thì sẽ xoá đi trong hàng đợi.
        })

        await channel.bindQueue(queue, "youtobe", "")

        await channel.consume(queue, msg => {
            console.log("msg received youtobe:: ", msg.content.toString())

        },
            {
                noAck: true
            })

    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

const runConsumerRabbitExchangeTopic = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@127.0.0.1');
        const channel = await connection.createChannel();

        await channel.assertExchange("send-email", "topic", {
            durable: true
        })

        const { queue } = await channel.assertQueue("", {
            exclusive: true //Khi mà user ko đăng kí nữa thì sẽ xoá đi trong hàng đợi.
        })
        console.log("process.argv", process.argv.slice(2))
        const agrs = process.argv.slice(2)
        console.log(`waiting queue ${queue}::: topic:: ${agrs}`);

        agrs.forEach(async key => {
            console.log("key", key)
            await channel.bindQueue(queue, "send-email", key)
        })


        await channel.consume(queue, msg => {
            console.log(`Routing key::  ${msg.fields.routingKey} ::: msg ::: ${msg.content.toString()}`)
        },
            {
                noAck: true
            })

    } catch (error) {
        console.log("error rabbitmq", error)
    }
}

runConsumerRabbit()
runConsumerRabbitExchange()
runConsumerRabbitExchangeYoutobe()
runConsumerRabbitExchangeTopic()