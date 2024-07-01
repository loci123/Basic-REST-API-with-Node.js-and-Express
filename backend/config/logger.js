// backend/config/logger.js

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'Activities.log' }),//This file include every thing , info level error as well as error level error
        new transports.File({ filename: 'ErrorLogsFile.log', level: 'error' }),
        
    ],
});

module.exports = logger;
