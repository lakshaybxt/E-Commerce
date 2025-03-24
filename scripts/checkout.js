import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

async function loadPage() {
    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);
    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
    loadProductsFetch(),
    loadCartFetch()

]).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/