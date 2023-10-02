import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalQuantity } from "../store/cartSlice";
import Image from "next/image";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import Modal from "./Modal";
import CartModal from "./CartModal";

const Header = () => {
  //const totalQuantity = useSelector(selectTotalQuantity);

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("CARTITEMs", cartItems);
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
    <header className="py-6">
      <div className="container mx-auto flex items-center justify-between">
        {/**Esto va a la izquierda */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logos.png"
            alt="Imagen logo"
            width={120} // Ancho deseado
            height={48} // Alto deseado
            className="h-12 w-12" // Estilos de Tailwind CSS para la imagen
          />
          <span className="text-black text-xl font-semibold ml-2">
            JORDAN STORE
          </span>
        </Link>

        {/**Esto va al medio */}
        <nav className="md:flex text-gray-800 space-x-6">
          <Link
            href="/producto/catalogoProductos"
            className="hover:text-black font-bold"
          >
            Catalogo
          </Link>
          <Link href="/about/aboutus" className="hover:text-black font-bold">
            Nosotros
          </Link>
          <Link href="" className="hover:text-black font-bold">
            Categoria
          </Link>
          <Link href="" className="hover:text-black font-bold">
            Contactanos
          </Link>
          <Link href="" className="hover:text-black font-bold">
            Blog
          </Link>
        </nav>

        <div>
          <div className="flex items-center space-x-2">
            <button className="hover:text-gray-500" onClick={openSearchModal}>
              <AiOutlineSearch size={34} />
            </button>
            <button className="hover:text-gray-500">
              <AiOutlineUser size={34} />
            </button>
            <button className="hover:text-gray-500 relative">
              <AiOutlineShoppingCart size={34} />
              <span className="absolute bottom-6 left-6 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-base font-medium">
                {cartItems.length > 0 ? cartItems.length : "0"}
              </span>
            </button>
          </div>
          {/* Renderizar el modal si isCartModalOpen es true */}
          {isCartModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              {CartModal}
            </div>
          )}
          <Modal isOpen={isSearchModalOpen} onClose={closeSearchModal} />
        </div>
      </div>
    </header>
  );
};

export default Header;
