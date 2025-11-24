import {addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import { displayQuantityOnHeader } from './checkout/orderSummary.js';




displayQuantityOnHeader();

let productsHTML = '';

products.forEach((product, index) =>{
    let html = `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name};
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-cart-quantity-selector-${product.id}">
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

          <div class='added-to-cart js-added-to-cart-${product.id}'>
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>

        `;

        productsHTML = productsHTML + html;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

let timeoutID;

function displayAddedMessage(productId){
  clearTimeout(timeoutID);
  let addedCartDisplay = document.querySelector(`.js-added-to-cart-${productId}`);
  addedCartDisplay.classList.add('display-added-to-cart');

  timeoutID = setTimeout(()=>{
    addedCartDisplay.classList.remove('display-added-to-cart');
  }, 500);
}


document.querySelectorAll('.js-add-to-cart-button').forEach((addToCartButton)=>{
  addToCartButton.addEventListener('click', ()=>{

    let productId = addToCartButton.dataset.productId;

    let selectorElement = document.querySelector(`.js-cart-quantity-selector-${productId}`);
    let quantity = Number(selectorElement.value);

    addToCart(productId, quantity);

    displayQuantityOnHeader();

    displayAddedMessage(productId);

  });
});