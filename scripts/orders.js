import { orders } from "../data/orders.js";
import {cart} from '../data/cart.js';
import { getProduct, products } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {formatCurrency} from '../scripts/utils/money.js';
import { loadProductsFetch } from "../data/products.js";
import { buyAgain } from "../data/orders.js";

console.log(orders);


async function loadOrderPage(){
    await loadProductsFetch();

    renderOrderPage();
}

function renderOrderPage(){
    let orderContainerHTML = '';
    orders.forEach((order)=>{
        let orderProductsHTML = '';

        let formattedDate = dayjs(order.orderTime).format('MMMM D');

        order.products.forEach((product)=>{

            let loadedProduct = getProduct(product.productId);

            let formattedDate = dayjs(product.estimatedDeliveryTime).format('MMMM D');

            let html = `
                <div class="product-image-container">
                  <img src="${loadedProduct.image}">
                </div>

                <div class="product-details">
                  <div class="product-name">
                    ${loadedProduct.name}
                  </div>
                  <div class="product-delivery-date">
                    Arriving on: ${formattedDate}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${product.quantity}
                  </div>
                  <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message " >Buy it again</span>
                  </button>
                </div>

                <div class="product-actions js-tracking-button" data-product-id="${product.productId}" data-order-id="${order.id}">
                  <a>
                    <button class="track-package-button button-secondary">
                      Track package
                    </button>
                  </a>
                </div>
            `;

            orderProductsHTML += html;
        });

        let html =`
            <div class="order-container">
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${formattedDate}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>

                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>

              <div class="order-details-grid">
                ${orderProductsHTML};
              </div>
            </div>
        `

        orderContainerHTML += html;

        document.querySelector('.js-orders-grid').innerHTML = orderContainerHTML;
    });

    document.querySelectorAll('.js-buy-again-button').forEach((buyAgainButton)=>{
        buyAgainButton.addEventListener('click', ()=>{
            let productId = buyAgainButton.dataset.productId;

            buyAgain(productId);

            console.log(cart);
            renderOrderPage();
        });
    });

    document.querySelectorAll('.js-tracking-button').forEach((trackButton)=>{
        trackButton.addEventListener('click', ()=>{

            let orderId = trackButton.dataset.orderId;
            let productId = trackButton.dataset.productId;

            console.log(orderId);
            console.log(productId);

            window.location.href = `../tracking.html?orderId=${orderId}&productId=${productId}`;
        })
    })
}

loadOrderPage();


