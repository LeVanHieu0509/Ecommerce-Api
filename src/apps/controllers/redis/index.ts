import { NextFunction } from "express";
import { SuccessResponse } from "../../../core/success.response";
import RedisService from "../../service/redis/redis.service";
import { RequestCustom } from "./../../auth/authUtils";
class RedisController {
  public static setPromise = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      const { key, payload } = req.body;

      return new SuccessResponse({
        message: "Redis set value success",
        statusCode: 200,
        metadata: await RedisService.setPromise({ key, value: JSON.stringify(payload) }),
      }).send(res);
    } catch (e) { }
  };

  public static getPromise = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      const { key } = req.body;
      return new SuccessResponse({
        message: "Redis get value success",
        statusCode: 200,
        metadata: await RedisService.getPromise({ key }),
      }).send(res);
    } catch (e) { }
  };

  public static publishRedis = async (req: RequestCustom, res: Response, next: NextFunction) => {
    try {
      const { key, value } = req.body;
      return new SuccessResponse({
        message: "Redis publish value success",
        statusCode: 200,
        metadata: await RedisService.publishRedis({ key, value }),
      }).send(res);
    } catch (e) { }
  };
}

export default RedisController;
