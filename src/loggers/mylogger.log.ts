import winston, { Logger, createLogger, transports } from "winston";
const { combine, timestamp, json, printf, align } = winston.format;
import "winston-daily-rotate-file";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const formatPrint = printf(({ level, message, context, requestId, timestamp, metadata }) => {
  return `${timestamp}::${level}::${context}::${requestId}::${message}::${JSON.stringify(metadata)}`;
});

const configLogger = (type) => {
  return {
    filename: `application-%DATE%.${type}.log`, //Có thể thay đổi theo giờ hoặc phút
    dirname: "src/logs",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true, // true: Lưu trữ file trước khi xoá bằng cách zip lại. (cần tìm hiểu cách xoá tự động)
    maxSize: "20m", //Vượt quá 20m thì sẽ sinh ra 1 file khác cho chúng ta.
    maxFiles: "14d", //Xoá tất cả các log trong vòng 14 ngày
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss A",
      }),
      formatPrint
    ),
    level: type,
  };
};

class MyLogger {
  logger: Logger;
  constructor() {
    this.logger = createLogger({
      format: combine(
        timestamp({
          format: "YYYY-MM-DD HH:mm:ss A",
        }),
        formatPrint
      ),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile(configLogger("info")),
        new transports.DailyRotateFile(configLogger("error")),
      ],
    });
  }
  commonParams(params) {
    let context, req, metadata;

    if (!Array.isArray(params)) {
      context = params;
    } else {
      [context, req, metadata] = params;
    }

    const requestId = req?.requestId || uuidv4();

    return {
      requestId,
      context,
      metadata,
    };
  }
  log(message, params) {
    const paramLog = this.commonParams(params);
    const logObject = Object.assign(
      {
        message,
      },
      paramLog
    );
    this.logger.info(logObject);
  }

  error(message, params) {
    const paramLog = this.commonParams(params);
    const logObject = Object.assign(
      {
        message,
      },
      paramLog
    );
    this.logger.error(logObject);
  }
}

export default MyLogger;
