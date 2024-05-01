import { getLogger } from "../core/logging";

const nlpManager = require('../core/nlp.config');

exports.processMessage = async (message:string) => {
  const responseObj = await nlpManager.process('en', message);

  const logger = getLogger();

  let answer = responseObj.answer
  switch(responseObj.intent) {
    case 'orderStatus':
      const orderid = responseObj.entities[0].sourceText
      logger.debug(orderid)
      answer += "PAID"
    default:
        logger.debug("Sorry, I did not understand that.");
  }

  logger.debug(responseObj)

  return answer || 'Sorry! I could not understand that, requesting you to rephrase!';
};