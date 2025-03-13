import { cart } from '../data/cart.js';
import { products } from '../data/products.js'
// const products = [{
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating : {
//         stars: 4.5,
//         count: 87
//     },
//     price: 1090
// }, {
//     image: 'images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate Size Basketball',
//     rating: {
//         stars: 4,
//         count: 127
//     },
//     price: 2095
// }, {
//     image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating: {
//         stars: 4.5,
//         count: 56
//     },
//     price: 799
// }, {
//     image: 'images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating: {
//         stars: 5,
//         count: 2197
//     },
//     price: 1899
// }];

let productsHTML = ``;

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  //by using a closure we are giving each a unique id
    let addedMessageTImeoutId;

    button.addEventListener('click', () => {
        // const productId = button.dataset.productId;
        const {productId} = button.dataset;
        //Here we are looping in the cart array to find out that the product is exist in the cart if it is we increase the quantity
        let matchingItem;
        cart.forEach((item) => {
          if(productId === item.productId) {
            matchingItem = item
          }
        })

        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);

        if(matchingItem) {
          matchingItem.quantity += quantity;
        } else {
          cart.push({ productId, quantity });
        }

        let cartQuantity = 0;
        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });
        
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        //Reset the quantity selector again
        quantitySelector.value = 1;

        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

        addedMessage.classList.add('added-to-cart-visible');

        if(addedMessageTImeoutId) {
          clearTimeout(addedMessageTImeoutId);
        }
        
        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);

        addedMessageTImeoutId = timeoutId;
    });
});