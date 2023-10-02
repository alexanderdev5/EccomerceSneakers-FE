import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, calculateTotal } from "../store/cartSlice";
import { updateQuantityCart, selectTotalQuantity } from "../store/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa"; // Importa el ícono de React Icons que desees usar

import toast, { Toaster } from "react-hot-toast";
// ...

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("CARTITEMs", cartItems);
  const total = useSelector((state) => state.cart.total);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();

  // Función para mostrar toasts personalizados
  const showToast = (message, icon, duration) => {
    toast(message, {
      icon,
      position: "top-right",
      duration,
      style: {
        background: "white",
        color: "black",
      },
    });
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));

    const message = `Se eliminó a '${item.name}' del carrito`;
    const icon = "✂️";
    const duration = 1300;

    showToast(message, icon, duration);
  };

  const handleUpdateCart = (item, newQuantity) => {
    dispatch(
      updateQuantityCart({
        id: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        newQuantity,
      })
    );

    const message = `Cantidad actualizada de '${item.name}'`;
    const icon = "✍️";
    const duration = 1000;

    showToast(message, icon, duration);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(calculateTotal());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <div className="max-w-3xl p-2">
      <h2 className="text-3xl font-semibold mb-6 text-center md:text-center">
        CARRITO
      </h2>
      <p className="text-black mb-6 font-semibold text-lg">
  Cantidad : {totalQuantity} {totalQuantity === 1 ? 'Producto' : 'Productos'}
</p>

      {cartItems.length === 0 ? (
        <p className="text-xl text-center">Tu carrito está vacío.</p>
      ) : (
        <AnimatePresence>
          <motion.div
            className="border rounded-lg overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }} // Animación de entrada
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} // Animación de salida
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          >
            <ul className="mb-2">
              {cartItems?.map((item, index) => {
                const totalPricePerProduct = item.price * item.quantity;

                return (
                  <li
                    key={item.key}
                    className="mb-4 border rounded-lg p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Image
                          src={item.miniatura}
                          alt={item.name}
                          width={300}
                          height={300}
                          className="w-16 h-16 rounded-md object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-sm font-semibold mb-2">
                            {item.name}
                          </h3>
                          <p className="text-gray-600">
                            <span className="text-black font-medium">
                              Precio :
                            </span>{" "}
                            <span className="text-base text-red-600 font-medium">
                              $ {item.price}
                            </span>
                          </p>
                          {item.selectedColor && (
                            <p className="text-gray-600">
                              <span className="text-black font-medium">
                                Color :
                              </span>{" "}
                              <span className="text-base text-red-600 font-medium">
                                {item.selectedColor}
                              </span>{" "}
                            </p>
                          )}
                          {item.selectedSize && (
                            <p className="text-gray-600">
                              <span className="text-black font-medium">
                                Tamaño :
                              </span>{" "}
                              <span className="text-base text-red-600 font-medium">
                                {item.selectedSize}
                              </span>{" "}
                            </p>
                          )}
                          {item.description && (
                            <p className="mt-2 text-black font-medium ">
                               {item.description.length > 15 ? `${item.description.slice(0, 15)}...` : item.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          className="w-16 h-8 text-center border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (newQuantity > 0) {
                              handleUpdateCart(item, newQuantity);
                            }
                          }}
                        />
                        <button
                          className="text-red-600 hover:text-red-800 ml-4"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <FaTrash /> {/* Reemplaza "Eliminar" por el ícono */}
                        </button>
                      </div>
                    </div>
                    <div className="text-sm font-semibold mt-2">
                      <span className="text-black">Total x Producto :</span>{" "}
                      <span className="text-xl text-black font-semibold">
                        $ {" "}{totalPricePerProduct.toFixed(2)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="text-xl font-semibold mx-2 mb-4 md:mb-0">
              Total :{" "}
              {typeof total === "number" ? `$ ${total.toFixed(2)}` : "N/A"}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between my-4 mx-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mb-4 md:mb-0"
                onClick={handleClearCart}
              >
                Vaciar Carrito
              </button>
              <Link
                href="/finalizarCompra"
                className="text-white text-center bg-blue-500 py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Finalizar Compra
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Cart;