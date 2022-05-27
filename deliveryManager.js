'use strict'

module.exports.deliveryOrder = ordersFulfilled => {
    console.log('Delivery order was called');

    return new Promise(resolve => {
        setTimeout(() => {
            console.log('timeout');
            resolve('timeout')
        }, 300);
    });
}

