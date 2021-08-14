const winston = require('winston');
const constant = require('./constants');
 
const logger = winston.createLogger({
    level: 'info',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: constant.STATIC_PATH + '/log/error.log', level: 'error' }),
    new winston.transports.File({ filename: constant.STATIC_PATH + '/log/server.log' }),
  ],
});

const loggerResult = winston.createLogger({
    level: 'info',
    levels: winston.config.npm.levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: constant.STATIC_PATH + '/result/data.json' }),
  ],
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }

module.exports = {
    logger: logger,
    loggerResult: loggerResult
}