export let cart = JSON.parse(localStorage.getItem("cart"));

// Initialize default cart if nothing in localStorage or if cart is invalid
if (!Array.isArray(cart) || cart.length === 0) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

// Add an item to the cart (or update quantity if it exists)
export function AddToCart(productId, quantity, callback = () => {}) {
  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveToStorage();
  Totalproducts(); // Optional if you want to trigger any UI count updates
  callback(); // Run any extra logic after add (like UI rerender)
}

// Remove an item from the cart
export function RemoveFromCart(productId, callback = () => {}) {
  cart = cart.filter((item) => item.productId !== productId);

  saveToStorage();
  Totalproducts(); // Optional if you want to keep this for syncing
  callback(); // Useful for UI logic
}

// Save current cart state to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Return the total number of products in the cart
export function Totalproducts() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
