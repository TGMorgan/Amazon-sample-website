import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export let deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id : "3",
    deliveryDays: 1,
    priceCents: 999
}
];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
      deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
          deliveryOption = option;
        }
      });

    return deliveryOption || deliveryOptions[0];
}


export function calculateDeliveryDate(deliveryOption){
  let today = dayjs();
  /* let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  let dateString = deliveryDate.format('dddd, MMMM D'); */

  let daysToDeliver = deliveryOption.deliveryDays;

  while(daysToDeliver > 0){
    today = today.add(1, 'day');

    if(today.day() !== 0 && today.day() !== 6){
      daysToDeliver--;
    }
  }
  return today;
}