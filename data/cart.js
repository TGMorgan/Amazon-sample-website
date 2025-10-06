export let cart = [];

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
          quantity: 1
        });
      }
  }