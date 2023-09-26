import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, calculateTotal } from "../store/cartSlice";
import { updateQuantityCart, selectTotalQuantity } from "../store/cartSlice";
import Link from "next/link";
import data from "../data/data";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("Cart-Item", cartItems)
  const total = useSelector((state) => state.cart.total);
  const totalQuantity = useSelector(selectTotalQuantity);
  const { colors, sizes } = data;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleUpdateCart = (item, newQuantity) => {
    dispatch(
      updateQuantityCart({
        id: item.id,
        color: item.color,
        size: item.size,
        newQuantity,
      })
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getColorNameById = (colorId) => {
    const color = colors.find((c) => c.id === colorId);
    return color ? (
      <div className="flex items-center">
        <div
          className="w-4 h-4 rounded-full mr-2"
          style={{ backgroundColor: color.value }}
        ></div>
        {color.name}
      </div>
    ) : (
      ""
    );
  };

  const getSizeValueById = (sizeId) => {
    const size = sizes.find((s) => s.id === sizeId);
    return size ? size.value : "";
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  return (
    <div className="max-w-3xl p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center md:text-left">
        Carrito de Compras
      </h2>
      <p className="text-black mb-6 font-semibold text-lg">
        Cantidad de Productos: {totalQuantity}
      </p>
      {cartItems.length === 0 ? (
        <p className="text-xl text-center">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="mb-8">
            {cartItems.map((item) => {
              const colorName = getColorNameById(item.color);
              const sizeName = getSizeValueById(item.size);
              const totalPricePerProduct = item.price * item.quantity;

              return (
                <li
                  key={`${item.id}-${item.color}-${item.size}`}
                  className="mb-4 border rounded-lg p-4 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-gray-600">
                          <span className="text-blue-500">Precio:</span>{" "}
                          <span className="text-xl text-red-600 font-medium">
                            ${item.price.toFixed(2)}
                          </span>
                        </p>
                        {colorName && (
                          <p className="text-gray-600">Color: {colorName}</p>
                        )}
                        {sizeName && (
                          <p className="text-gray-600">Tamaño: {sizeName}</p>
                        )}
                        {item.description && (
                          <p className="text-gray-600 mt-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        Eliminar
                      </button>
                      <input
                        className="w-16 h-8 text-center border border-gray-300 rounded ml-4"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (newQuantity > 0) {
                            handleUpdateCart(item, newQuantity);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-gray-600 mt-2">
                    <span className="text-blue-500">
                      Total por Producto:
                    </span>{" "}
                    <span className="text-xl text-red-600 font-medium">
                      ${totalPricePerProduct.toFixed(2)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="text-xl font-semibold mb-4 md:mb-0">
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between">
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
        </div>
      )}
    </div>
  );
};

export default Cart;
