console.log("a");
// type PriceStrategies = "preOrder" | "promotion" | "blackFriday" | "dayPrice" | "default";

//Nếu như không sử dụng design parttern thì phải if else hoặc switch nhiều, sau này xử lý sẽ bị khó khăn

const preOrderPrice = (originalPrice) => {
  return originalPrice * 0.4;
};
const promotionPrice = (originalPrice) => {
  return originalPrice * 0.5;
};
const blackFridayPrice = (originalPrice) => {
  return originalPrice * 0.6;
};
const dayPrice = (originalPrice) => {
  return originalPrice * 0.7;
};
const defaultPrice = (originalPrice) => {
  return originalPrice * 0.8;
};

const getPriceStrategies = {
  preOrder: preOrderPrice,
  promotion: promotionPrice,
  blackFriday: blackFridayPrice,
  dayPrice: dayPrice,
  default: defaultPrice,
};

function getPrice(originalPrice, typePromotion) {
  return getPriceStrategies[typePromotion](originalPrice);
}

console.log(getPrice(120000, "blackFriday"));
