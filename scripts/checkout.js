import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch } from '../data/products.js';
// import { loadCart } from '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

Promise.all([
    loadProductsFetch (),
    // new Promise((resolve) => {
    //     loadCart(() => {
    //         resolve();
    //     })
    // })

]).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
