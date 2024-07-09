import pkg from "winston";
const { createLogger, format, transports: transport } = pkg;


const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transport.Console(),
        new transport.File({filename: "logs.log"}),
        new transport.File({filename: "error.log", level: "error"})
    ]
});

export default logger;
