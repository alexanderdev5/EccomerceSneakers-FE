// CartModal.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import Cart from "@/pages/cart";

const CartModal = ({ onClose }) => {
  const handleModalClick = (e) => {
    // Cierra el modal solo si se hace clic fuera de él
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex justify-end items-stretch"
      onClick={handleModalClick} // Cierra el modal al hacer clic fuera de él
    >
      <div
        className="bg-white w-[420px] shadow-md overflow-y-auto p-4 h-full"
      >
        {/* Contenido del modal */}
        <Cart />
      </div>
    </div>
  );
};

export default CartModal;
