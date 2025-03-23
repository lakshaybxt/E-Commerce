export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    // console.log(order);
    orders.unshift(order);
    saveToStorage();
    // console.log(orders);
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}