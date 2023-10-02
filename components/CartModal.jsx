import React, { useState } from "react";
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";

const CartModal = () => {
   

  return (
    <div className="bg-white p-4 rounded-lg w-96">
    <h2 className="text-xl font-semibold mb-4">Carrito de compras</h2>
    {/* Aquí puedes mostrar la lista de productos en el carrito */}
    {/* Puedes utilizar mapeo para mostrar los productos y su cantidad */}
    <div>
      <p>Producto 1 - Cantidad: 2</p>
      <p>Producto 2 - Cantidad: 1</p>
      {/* Agrega más productos según sea necesario */}
    </div>
    <button
      onClick={closeCartModal}
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Cerrar
    </button>
  </div>
  );
  }

  export default CartModal;