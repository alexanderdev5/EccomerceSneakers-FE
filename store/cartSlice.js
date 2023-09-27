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
    
      // Genera una clave única para el producto en el carrito
      // Incluye el id, el color y la talla solo si están disponibles
      const itemKey = `${id}-${selectedColor || 'N/A'}-${selectedSize || 'N/A'}`;
    
      // Busca el elemento en el carrito con la misma clave
      const existingItem = state.cartItems.find((item) => item.key === itemKey);
    
      if (existingItem) {
        // Si el producto ya existe, aumenta su cantidad en 1
        existingItem.quantity += 1;
      } else {
        // Si el producto no existe, agrégalo al carrito con la clave generada
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
