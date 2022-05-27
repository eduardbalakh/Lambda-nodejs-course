'use strict';

const orderManager = require('./orderManager');
const kinesisHelper = require('./kinesisHelper');
const cakeProducerManager = require('./cakeProducerManager');
const deliveryManager = require('./deliveryManager');

function createResponse(statusCode, message) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };

  return response;
}


module.exports.createOrder = async (event) => {

  const body = JSON.parse(event.body);
  const order = orderManager.createOrder(body);

  return orderManager.placeNewOrder(order).then(() => {
    return createResponse(200, order)
  }).catch(error => {
    return createResponse(400, error);
  });

};

module.exports.orderFulfillment = async (event) => {

  const body = JSON.parse(event.body);
  const orderId = body.orderId;
  const fulfillmentId = body.fulfillmentId;

  return orderManager.fulfillOrder(orderId, fulfillmentId).then(() => {
    return createResponse(200, `Order with orderId:${orderId} was sent to delivery`);
  }).catch(error => {
    return createResponse(400, error);
  });

}

module.exports.notifyExternalParties = async (event) => {
  const records = kinesisHelper.getRecords(event);

  const cakeProducerPromise = getCakeProducerPromise(records);
  const deliveryCompanyPromise = getDeliveryPromise(records);

  return Promise.all([cakeProducerPromise, deliveryCompanyPromise]).then(() => {
    return 'everything went well';
  }).catch(error => {
    return error;
  });
}

function getCakeProducerPromise(records) {
  const ordersPlaced = records.filter(r => r.eventType === 'order_placed');
  if(ordersPlaced.length > 0) {
    return cakeProducerManager.handlePlacedOrders(ordersPlaced);
  }
  else {
    return null;
  }
}

  function getDeliveryPromise(records) {
    const ordersFulfilled = records.filter(r => r.eventType === 'order_fulfilled');
    if(ordersFulfilled.length > 0) {
      return deliveryManager.deliveryOrder(ordersFulfilled);
    }
    else {
      return null;
    }
  }



