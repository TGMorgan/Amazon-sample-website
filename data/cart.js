
export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart =  JSON.parse(localStorage.getItem('cart'));

  if(cart === null){
    cart =[];
  }
}



function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

      cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      let selectorElement = document.querySelector(`.js-cart-quantity-selector-${productId}`);
      let quantity =  Number(selectorElement.value);

      if(matchingItem){
        matchingItem.quantity += quantity;
      }
      else{
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionsId: '1'
        });
      }

      saveToStorage()
  }

export function removeFromCart(productId){
  let newCart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity = cartQuantity + cartItem.quantity;
    });

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity;
    }
  });
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

      cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      saveToStorage();
}

export async function loadCartFetch(){
  let response = await fetch('https://supersimplebackend.dev/cart');

  let cartText = await response.text();

  console.log(cartText);
}