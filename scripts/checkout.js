import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
/* import '../data/cart-class.js'; */
/* import '../data/car.js'; */
/* import '../data/backend-practice.js'; */

/* async function loadPage(){
    try{
        //throw 'error1';

        await loadProductsFetch();

        await loadCartFetch();

    }
    catch(error){
        console.log('Unexpected Error. Please try again later');
    }


    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage(); */

Promise.all([
    loadProductsFetch(),

    loadCartFetch()
]).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}).catch(()=>{
    console.log('Unexpected Error. Try again later')
});



/* Promise.all([
    loadProductsFetch(),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then((values)=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}) */

/*
Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve('value1');
        });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then((values)=>{
    console.log(values);
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}) */

/* new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value1');
    });
}).then((value)=>{
    console.log(value);
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
}).then(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}); */

/* loadProducts(()=>{
    loadCart(()=>{
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    })
}); */
