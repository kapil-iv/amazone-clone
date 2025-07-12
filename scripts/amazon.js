import { cart, AddToCart } from "../data/cart.js";
import { products } from "../data/products.js";

const addedTimeouts = {};

function generateProductHTML(product) {
  return `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">${product.name}</div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-product-quantity-selector-${product.id}">
          ${[...Array(10)]
            .map(
              (_, i) =>
                `<option value="${i + 1}" ${i === 0 ? "selected" : ""}>${
                  i + 1
                }</option>`
            )
            .join("")}
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
}

function updateCartQuantityUI() {
  let cartQuantity = 0;
  cart.forEach((item) => (cartQuantity += item.quantity));

  const cartHtml = `
    <a class="orders-link header-link" href="orders.html">
      <span class="returns-text">Returns</span>
      <span class="orders-text">& Orders</span>
    </a>
    
    <a class="cart-link header-link" href="checkout.html">
      <img class="cart-icon" src="images/icons/cart-icon.png">
      <div class="cart-quantity js-cart-quantity">${cartQuantity}</div>
      <div class="cart-text">Cart</div>
    </a>`;

  document.querySelector(".amazon-header-right-section").innerHTML = cartHtml;
}

// function AddToCart(productId, quantity) {
//   let matchingItem = cart.find((item) => item.productId === productId);

//   if (matchingItem) {
//     matchingItem.quantity += quantity;
//   } else {
//     cart.push({ productId, quantity });
//   }

//   updateCartQuantityUI();
// }

function showAddedMessage(button, productId) {
  const addedMessage = button
    .closest(".product-container")
    .querySelector(".added-to-cart");

  if (addedTimeouts[productId]) {
    clearTimeout(addedTimeouts[productId]);
  }

  addedMessage.classList.add("visible");

  addedTimeouts[productId] = setTimeout(() => {
    addedMessage.classList.remove("visible");
    delete addedTimeouts[productId];
  }, 2000);
}

// RENDER PRODUCTS
let productHTML = "";
products.forEach((product) => {
  productHTML += generateProductHTML(product);
});
document.querySelector(".js-products-grid").innerHTML = productHTML;

// ADD EVENT LISTENERS
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantitySelector = document.querySelector(
      `.js-product-quantity-selector-${productId}`
    );
    const quantity = parseInt(quantitySelector?.value || 1);

    AddToCart(productId, quantity, updateCartQuantityUI);
    showAddedMessage(button, productId);
  });
});
