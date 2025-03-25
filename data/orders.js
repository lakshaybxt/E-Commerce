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

export function getOrder(orderId) {
    let matchingOrder;

    orders.forEach((order) => {
        if(order.id === orderId) {
            matchingOrder = order;
        }
    });
    // console.log(orderId)
    // console.log(orders);
    // const matchingOrder = orders.find(order => { order.id === orderId});
    console.log(matchingOrder);
    return matchingOrder;
}