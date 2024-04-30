import { getLogger } from "../core/logging";

const nlpManager = require('../core/nlp.config');

exports.processMessage = async (message:string) => {
  const responseObj = await nlpManager.process('en', message);

  const logger = getLogger();

  logger.debug(responseObj)

  return responseObj.answer || 'Sorry! I could not understand that, requesting you to rephrase!';
};