import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, description, price, miniatura, selectedColor, selectedSize } = action.payload;

      // Generate a unique key for the cart item based on id, color, and size
      const itemKey = `${id}-${selectedColor}-${selectedSize}`;

      // Check if the item with the same key is already in the cart
      const existingItem = state.cartItems.find((item) => item.key === itemKey);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with the generated key
        state.cartItems.push({
          key: itemKey,
          id,
          name,
          price,
          description,
          miniatura,
          selectedColor,
          selectedSize,
          quantity: 1,
        });
      }
    },
    updateQuantityCart: (state, action) => {
      const { id, selectedSize, selectedColor, newQuantity } = action.payload;

      // Find the item in the cart with the matching id, selectedColor, and selectedSize
      const targetItem = state.cartItems.find(
        (item) => item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );

      if (targetItem) {
        // Update the quantity of the target item
        targetItem.quantity = newQuantity;
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload;

      // Filter out the item with the specified id, selectedColor, and selectedSize
      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      );
    },
    clearCart: (state) => {
      // Clear the entire cart by setting cartItems to an empty array
      state.cartItems = [];
    },
    calculateTotal: (state) => {
      state.total = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateQuantityCart, removeFromCart, calculateTotal, clearCart } = cartSlice.actions;
export const selectTotalQuantity = (state) => {
  return state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
};
export default cartSlice.reducer;
