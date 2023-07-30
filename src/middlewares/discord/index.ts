import LoggerService from "../../apps/loggers/discord-v2.log"

export const pushToLogDiscord = async (req, res, next) => {
    try {
        let logger = new LoggerService()
        logger.sendToMessage(req.get('host'));

        return next()
    }
    catch (e) {
        next(e)
    }
}