import { orders } from "../data/orders.js";
import { loadProductsFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

async function loadTrackingPage(){
    await loadProductsFetch();

    renderTrackingPage();
}


function renderTrackingPage(){
    let url = new URL(window.location.href);

    let orderId = url.searchParams.get('orderId');
    let productId = url.searchParams.get('productId');

    let productOrderDetails;
    orders.forEach((order)=>{
        if(orderId === order.id){
            productOrderDetails = order;
        }
    });

    let productDetails = getProduct(productId);

    let productQuantity;
    let deliveryTime;
    productOrderDetails.products.forEach((product)=>{
        if(product.productId === productDetails.id){
            productQuantity = product.quantity;
        }

        if(product.productId === productDetails.id){
         deliveryTime = dayjs(product.estimatedDeliveryTime);
        }
    });

    let orderTime = dayjs(productOrderDetails.orderTime);
    let deliveryDateString = orderTime.format('dddd, MMMM D');

    let currentTime = dayjs();

    let progressPercentage = ((currentTime.valueOf() - orderTime.valueOf())/ (deliveryTime.valueOf() - orderTime.valueOf())) * 100;
    console.log(progressPercentage)

    let trackingPageHtml = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${deliveryDateString}
            </div>

            <div class="product-info">
            ${productDetails.name}
            </div>

            <div class="product-info">
            Quantity: ${productQuantity}
            </div>

            <img class="product-image" src="${productDetails.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar" style ="width: ${progressPercentage}%"></div>
            </div>
        </div>
    `;

    document.querySelector('.js-tracking-page').innerHTML = trackingPageHtml;
}

loadTrackingPage();
