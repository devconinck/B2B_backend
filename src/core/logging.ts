import winston from 'winston';
const { combine, timestamp, colorize, printf } = winston.format;

let logger: winston.Logger;

// Pad log files
const logpath = './logs/';

const loggerFormat = () => {
  const formatMessage = ({ level, message, timestamp, ...rest }: any) =>
    `${timestamp} | ${level} | ${message instanceof Object ? JSON.stringify(message) : message} | ${JSON.stringify(rest)}`;

  // Errors manueel formatteren
  const formatError = ({ error: { stack }, ...rest }: any) => `${formatMessage(rest)}\n\n${stack}\n`;

  const format = (info: any) => (info.error instanceof Error ? formatError(info) : formatMessage(info));

  return combine(timestamp(), printf(format));
};

// Root logger
export const getLogger = () => {
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
 */
export const initializeLogger = ({
  level,
  disabled,
  defaultMeta = {},
}: {
  level: string;
  disabled: boolean;
  defaultMeta?: Record<string, any>;
}) => {
  logger = winston.createLogger({
    level,
    defaultMeta,
    format: loggerFormat(),
    transports: [
      new winston.transports.Console({
        // Kleurcodes
        format: combine(colorize(), loggerFormat()),
        silent: disabled,
      }),
      new winston.transports.File({ filename: `${logpath}error.log`, level: 'error' }),
      new winston.transports.File({ filename: `${logpath}info.log`, level: 'info' }),
      new winston.transports.File({ filename: `${logpath}debug.log`, level: 'debug' }),
    ],
  });

  logger.info(`Logger initialized with minimum log level ${level}`);
};