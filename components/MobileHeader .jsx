import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineMenu,
} from "react-icons/ai";
import Modal from "./Modal";
import CartModal from "./CartModal";

const MobileHeader = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  const openCartModal = () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  return (
    <header className="md:hidden py-6 sticky top-0 bg-gray-100 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/**Hamburguesa y lupa en el lado izquierdo */}
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-500">
            <AiOutlineMenu size={34} />
          </button>
          <button className="hover:text-gray-500" onClick={openSearchModal}>
            <AiOutlineSearch size={34} />
          </button>
        </div>

        {/**Logo en el centro */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logos.png"
            alt="Imagen logo"
            width={120}
            height={48}
            className="h-12 w-12"
          />
          <span className="text-black text-xl font-semibold ml-2">
            JORDAN STORE
          </span>
        </Link>

        {/**User y carrito en el lado derecho */}
        <div className="flex items-center space-x-1 relative">
          <button className="hover:text-gray-600">
            <AiOutlineUser size={30} />
          </button>
          <button className="hover:text-gray-600 relative" onClick={openCartModal}>
            <AiOutlineShoppingCart size={30} />
            <span className="absolute -top-5 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
              {cartItems.length > 0 ? cartItems.length : "0"}
            </span>
          </button>
        </div>

        {/* Renderizar el modal si isCartModalOpen es true */}
        {isCartModalOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <CartModal onClose={closeCartModal} />
  </div>
)}
        <Modal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
      </div>
    </header>
  );
};

export default MobileHeader;
