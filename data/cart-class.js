import { products, Clothing, Appliance, Product } from "./products.js";

class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage(); 
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
            { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2, deliveryOptionId: '1' },
            { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1, deliveryOptionId: '2' }
        ];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);

        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);
        
        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({ 
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
        // Reset quantity selector
        quantitySelector.value = 1;
        
        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
        this.saveToStorage();
    }

    calculateCartQuantity() {
        return this.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
      
        if (matchingItem) {
            matchingItem.quantity = newQuantity;
            this.saveToStorage();
        }
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
        
        if (matchingItem) {
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    }
}

export const cart = new Cart('cart-oop');

/*
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
     fun();
});

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
*/