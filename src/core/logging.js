const winston = require('winston');

const {
    combine,
    timestamp,
    colorize,
    printf,
} = winston.format;

let logger;

// Path of log files
const logpath = './logs/';


// Colorize uit functie verwijderd. Dit zorgde voor een rare ouput in mijn log files
const loggerFormat = () => {
    const formatMessage = ({
        level,
        message,
        timestamp,
        ...rest
    }) => `${timestamp} | ${level} | ${message instanceof Object ? JSON.stringify(message) : message} | ${JSON.stringify(rest)}`;

    // Errors don't have a decent toString, so we need to format them manually
    const formatError = ({
        error: {
            stack,
        },
        ...rest
    }) => `${formatMessage(rest)}\n\n${stack}\n`;
    const format = (info) => info.error instanceof Error ? formatError(info) : formatMessage(info);
    return combine(timestamp(), printf(format));
};

/**
 * Get the root logger.
 */
module.exports.getLogger = () => {
    if (!logger) throw new Error('You must first initialize the logger');
    return logger;
};

/**
 * Initialize the root logger.
 *
 * @param {object} options - The log options.
 * @param {string} options.level - The log level.
 * @param {boolean} options.disabled - Disable all logging.
 * @param {object} options.defaultMeta - Default metadata to show.
 * Extra transports verwijderd, ik schrijf mijn transports gewoon in winston.createLogger(), dit vind ik duidelijker
 */
module.exports.initializeLogger = ({
    level,
    disabled,
    defaultMeta = {},
}) => {
    logger = winston.createLogger({
        level,
        defaultMeta,
        format: loggerFormat(),
        transports: [
            new winston.transports.Console({
                // Format override, zo kan de console toch de kleurcode blijven gebruiken
                format: combine(colorize(), loggerFormat()),
                silent: disabled,
            }),
            new winston.transports.File({
                filename: `${logpath}error.log`,
                level: 'error',
            }),
            new winston.transports.File({
                filename: `${logpath}info.log`,
                level: 'info',
            }),
            new winston.transports.File({
                filename: `${logpath}debug.log`,
                level: 'debug',
            }),
        ],
    });

    logger.info(`Logger initialized with minimum log level ${level}`);
};