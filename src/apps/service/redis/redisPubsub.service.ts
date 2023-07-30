import client from "../../../dbs/init.redis";

class RedisPubSubService {


    publisher: any;
    subscriber: any;

    constructor() {
        this.subscriber = client;
        this.publisher = client;
    }

    publishRedis(channel, message) {
        console.log("channel PUBLISH", channel)
        return new Promise((resolve, reject) => {
            client.PUBLISH(channel, message, (err: any, reply: any) => {
                if (err) {
                    reject(`err: ${err}`)
                }
                else {
                    resolve(`PUBLISH to ${channel}: ${reply}`)
                }
            })
        })
    }

    subscriberRedis(channel, callback) {
        console.log("channel", channel)


        client.SUBSCRIBE(channel, function (err, reply) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Subscribed to ${channel}: ${reply}`);
            }
        })
        client.on("message", (subscriberChannel: any, message: any) => {
            if (channel === subscriberChannel) {
                callback(channel, message)
            }

        })

    }
}

export default RedisPubSubService