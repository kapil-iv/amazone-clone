export const cart = [];
export function AddToCart(productId, quantity,callback) {
  let matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  return callback();
}
