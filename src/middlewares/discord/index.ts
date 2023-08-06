// import LoggerService from "../../apps/loggers/discord-v2.log"
import { SuccessResponse } from "../../core/success.response";
import LoggerService from "../../apps/loggers/discord-v2.log";
export const pushToLogDiscord = async (req, res, next) => {
    try {
        let logger = LoggerService.getInstance()

        new SuccessResponse({
            message: "",
            statusCode: 200,
            metadata: await logger.sendToMessage(req.body.message)
        }).send(res)
    }
    catch (e) {
        next(e)
    }
}