var appRoot = require('app-root-path'),
    winston = require('winston');

var options = {
    file: {
        level: 'info',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

module.exports = (id, type) => {
    console.log(`${appRoot.path}\\Data\\Info\\Logs\\${id}\\${type}.log`);
    const logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: `${appRoot.path}\\Data\\Info\\Logs\\${id}\\${type}.log` }),
          //  new winston.transports.Console(options.console)
        ],
        exitOnError: false, // do not exit on handled exceptions
    });
    return logger;

}