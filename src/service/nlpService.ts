import { getPaymentStatusByNumber } from "../core/enum";
import { getLogger } from "../core/logging";
import repositoryOrders from "../data/order";

const nlpManager = require('../core/nlp.config');

exports.processMessage = async (message:string, state:any) => {
  const responseObj = await nlpManager.process('en', message);
  const logger = getLogger();

  logger.debug(responseObj);

  let answer = responseObj.answer
  switch(responseObj.intent) {
    case 'orderStatus':
      if(state == undefined){
        answer = "Hmm, it looks like you are not logged in. Please login to see information about your invoices"
      }else if(responseObj.entities.length <= 0){
        answer = "What is the invoice number?"
      }else{
        const orderid = responseObj.entities[0].sourceText
        logger.debug(state.role)
        logger.debug(state.companyId)
        logger.debug(orderid)
        const order = await repositoryOrders.findOrder(state.role, state.companyId, orderid)
        if(order === null){
          answer = `I couldn't find an invoice with number #${orderid}.`
        }else{
          const status = getPaymentStatusByNumber(order.PAYMENTSTATUS)
          answer += status
        }
      }
    default:
        logger.debug("Sorry, I did not understand that.");
  }

  return answer || 'Sorry! I could not understand that, requesting you to rephrase!';
};