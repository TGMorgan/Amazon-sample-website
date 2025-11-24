import {cart, removeFromCart, calculateCartQuantity, updateQuantity , updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';



export function renderOrderSummary(){

  let cartSummaryHTML = '';
  cart.forEach((cartItem)=>{
      let productId = cartItem.productId;

      let matchingProduct = getProduct(productId);

      let deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption = getDeliveryOption(deliveryOptionId);

      let deliveryDate  = calculateDeliveryDate(deliveryOption);
      let dateString = deliveryDate.format('dddd, MMMM D');

      let html = `
          <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name js-product-name-${matchingProduct.id}">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price js-product-price-${matchingProduct.id}">
                    $${(formatCurrency(matchingProduct.priceCents))}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link js-update-link-${matchingProduct.id}" data-product-id ="${matchingProduct.id}">
                      Update
                    </span>
                    <span class="update-min-form">
                      <input type="text" class="quantity-input js-quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      <span class="save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
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
          </div>`;

      cartSummaryHTML = cartSummaryHTML + html;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem){
    let deliveryOptHTML= '';
    deliveryOptions.forEach((deliveryOption)=>{
      let deliveryDate  = calculateDeliveryDate(deliveryOption);
      let dateString = deliveryDate.format('dddd, MMMM D');

      let priceString;
      if(deliveryOption.priceCents === 0){
        priceString = 'FREE';
      }
      else{
        priceString = `$${formatCurrency(deliveryOption.priceCents)}`;
      }

      let isChecked;
      if(deliveryOption.id === cartItem.deliveryOptionId){
        isChecked = true;
      }

      let html = `
        <div class="delivery-option">
          <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>`;

        deliveryOptHTML = deliveryOptHTML + html;
    });

    return deliveryOptHTML;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      let productId = link.dataset.productId;

      removeFromCart(productId);

      renderCheckoutHeader();

      /* let container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove(); */
      renderOrderSummary();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((update)=>{
    update.addEventListener("click", ()=>{
      let productId = update.dataset.productId;

      let cartContainerElement = document.querySelector(`.js-cart-item-container-${productId}`);
      cartContainerElement.classList.add('is-editing-quantity');

      update.classList.add('removeUpdate');
    });
  });

  function saveQuantity(productId){
    let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    console.log(newQuantity);
    if(newQuantity < 0 || newQuantity > 10){
      document.querySelector(`.js-quantity-input-${productId}`).value = '';
      alert('Please enter a number from 1 to 10');
    }
    else{
      updateQuantity(productId, newQuantity);
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
      displayQuantityOnHeader();

      document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      document.querySelector(`.js-update-link-${productId}`).classList.remove('removeUpdate');
    }
  }


  document.querySelectorAll('.save-quantity-link').forEach((save)=>{
    save.addEventListener('click', ()=>{
      let productId = save.dataset.productId;

      saveQuantity(productId);
    });
  });


  document.querySelectorAll('.js-quantity-input').forEach((quantityInput)=>{
    quantityInput.addEventListener('keydown', (event)=>{
      let productId = quantityInput.dataset.productId;

      if(event.key === "Enter"){
        saveQuantity(productId);
      }
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', ()=>{

      /* let productId = element.dataset.productId;
      let deliveryOptionId = element.dataset.deliveryOptionId;

      OR
      */
      let {productId, deliveryOptionId} = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

export function displayQuantityOnHeader(){
  let cartQuantity = calculateCartQuantity();
  document.querySelectorAll('.js-cart-quantity').forEach((quantityVariable)=>{
    quantityVariable.innerHTML= cartQuantity;
  });
}