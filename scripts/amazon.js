// const products = [
//   {
//     id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: 1090,
//     keywords: ["socks", "sports", "apparel"],
//   },
// ];
import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
const addedTimeouts = {};

let productHTML = "";

products.forEach((product) => {
  productHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

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

          <div class="product-quantity-container ">
            <select class="js-product-quantity-selector-${product.id}">
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div> 
    `;
});

document.querySelector(".js-products-grid").innerHTML = productHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantitySelector = document.querySelector(
      `.js-product-quantity-selector-${productId}`
    );
    const quantity = parseInt(quantitySelector?.value || 1);
    console.log(quantity);
    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity || 1;
    } else {
      cart.push({
        productId: productId,
        quantity: quantity || 1,
      });
    }

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    const cartHtml = ` <a class="orders-link header-link" href="orders.html">
  <span class="returns-text">Returns</span>
  <span class="orders-text">& Orders</span>
  </a>
  
  <a class="cart-link header-link" href="checkout.html">
  <img class="cart-icon" src="images/icons/cart-icon.png">
  <div class="cart-quantity js-cart-quantity">${cartQuantity}</div>
  <div class="cart-text">Cart</div>
  </a> `;
    document.querySelector(".amazon-header-right-section").innerHTML = cartHtml;

    // Get the product ID and corresponding "Added" message element

    const addedMessage = button
      .closest(".product-container")
      .querySelector(".added-to-cart");

    // 👇 Clear existing timeout if it exists
    if (addedTimeouts[productId]) {
      clearTimeout(addedTimeouts[productId]);
    }

    // 👇 Show the message
    addedMessage.classList.add("visible");

    // 👇 Set a fresh 2-second timeout
    addedTimeouts[productId] = setTimeout(() => {
      addedMessage.classList.remove("visible");
      delete addedTimeouts[productId]; // optional cleanup
    }, 2000);
  });
});
