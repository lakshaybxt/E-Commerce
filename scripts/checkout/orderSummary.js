import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import formatCurrency from '.././utils/money.js';
// import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

// hello();

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate.format('dddd, MMMM D'));

// console.log(deliveryDate);

export function renderOrderSummary() {
    let cartSummayHTML = ``;

    cart.forEach((cartItem) => {
        const productId = cartItem.productId
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

        // console.log(matchingProduct);
        cartSummayHTML += `
        <div class="cart-item-container js-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
            </div>
        `;
    });
    // console.log(cartSummayHTML);

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = ``;

        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);

            // console.log(matchingProduct);

            const priceString = (deliveryOption.priceCents === 0) ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`; 
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            // console.log(isChecked);

            html += `
                <div class="delivery-option js-delivery-option"
                data-product-id=${matchingProduct.id}
                data-delivery-option-id=${deliveryOption.id}>
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                    </div>
                </div>
            `;
        });

        return html;
    }

    document.querySelector('.order-summary').innerHTML = cartSummayHTML;

    document.querySelectorAll('.js-delete-quantity-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                console.log('Delete');
                const productId = link.dataset.productId;
                removeFromCart(productId);
                
                renderOrderSummary();
                // updateCartQuantity();
                renderPaymentSummary();
                renderCheckoutHeader();
            });
        });

    // function updateCartQuantity() {
    //     const cartQuantity = calculateCartQuantity();
        
    //     document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    // } 


    // updateCartQuantity();

    document.querySelectorAll('.js-update-quantity-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-item-container-${productId}`);
                console.log(container);
                container.classList.add('is-editing-quantity');
            });
        
        });

    document.querySelectorAll('.js-save-quantity-link')
        .forEach((link) => {
            const productId = link.dataset.productId;
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

            link.addEventListener('click', () => {
                handleUpdateQuantity(productId, quantityInput);
            });
            quantityInput.addEventListener('keydown', (event) => {
                if(event.key === 'Enter') {
                    handleUpdateQuantity(productId, quantityInput);
                }
            });
        });

    function handleUpdateQuantity(productId, quantityInput) {
        const newQuantity = Number(quantityInput.value);
                
        if(newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }
        updateQuantity(productId, newQuantity);

        const container = document.querySelector(`.js-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;

        updateCartQuantity();
    }

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            })
        });
}

renderOrderSummary();