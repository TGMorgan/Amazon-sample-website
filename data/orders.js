export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function buyAgain(productId){
    let matchingProduct;

    orders.forEach((order)=>{
        order.products.forEach((productItem)=>{
            if(productItem.productId === productId){
                matchingProduct = productItem;
            }
        });
    })

    matchingProduct.quantity += 1;

    saveToStorage();
}