import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import data from "../data/data"; // Importa los datos desde tu archivo JSON
import { FaShoppingCart } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, colors, sizes } = data; // Extrae los datos de productos, colores y tallas desde el archivo JSON




  const [selectedColors, setSelectedColors] = useState(
    Array(products.length).fill("")
  );
  const [selectedSizes, setSelectedSizes] = useState(
    Array(products.length).fill("")
  );

  const handleColorChange = (index, color) => {
    const newSelectedColors = [...selectedColors];
    newSelectedColors[index] = color;
    setSelectedColors(newSelectedColors);
  };

  const handleSizeChange = (index, size) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = size;
    setSelectedSizes(newSelectedSizes);
  };

  const resetSelections = (index) => {
    const newSelectedColors = [...selectedColors];
    const newSelectedSizes = [...selectedSizes];
    newSelectedColors[index] = "";
    newSelectedSizes[index] = "";
    setSelectedColors(newSelectedColors);
    setSelectedSizes(newSelectedSizes);
  };

  const handleAddToCart = (product, index) => {
    if (product.colors?.length > 0 && selectedColors[index] === "") {
      alert("Por favor, selecciona un color antes de agregar al carrito.");
    } else if (product.sizes?.length > 0 && selectedSizes[index] === "") {
      alert("Por favor, selecciona una talla antes de agregar al carrito.");
    } else {
      const productToAdd = {
        ...product,
        color: selectedColors[index],
        size: selectedSizes[index],
      };
      dispatch(addToCart(productToAdd));

       // Mostrar notificación tostada de éxito
       toast.success(`Se agregó al Carrito: '${product.name}'`, {
        duration: 9000,
        style: {
          background: 'white',
          color: 'black',
        },
      });
      resetSelections(index);
    }
  };

  return (
    <div className="max-w-8xl mx-auto">
      <Toaster position="top-center" />

  <h2 className="text-3xl font-semibold mb-8 text-center md:text-left">
    Lista de Productos (COLOR y SIZE)
  </h2>
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6">
    {products.map((product, index) => (
      <div
        key={product.id}
        className="border rounded-lg overflow-hidden flex flex-col"
      >
        <div className="p-2 flex-grow">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="w-48 h-48 rounded-md mb-2 mr-4 sm:w-48 sm:h-48 md:w-48 md:h-48"
          />
          <p className="text-gray-600 mb-2">Precio: ${product.price}</p>
          <p className="text-gray-600 mb-2">{product.description}</p>
          {product.colors?.length > 0 && (
            <div className="mb-2">
              <label
                htmlFor={`color-select-${product.id}`}
                className="block font-medium text-gray-700"
              >
                COLOR:
              </label>
              <div className="flex items-center space-x-2">
                {product.colors.map((colorId) => {
                  const color = colors.find((c) => c.id === colorId);
                  return (
                    <div
                      key={colorId}
                      className={`w-8 h-8 rounded-full cursor-pointer ${
                        color?.id === selectedColors[index]
                          ? "border-2 border-gray-600"
                          : ""
                      }`}
                      style={{ backgroundColor: color?.value }}
                      onClick={() => handleColorChange(index, color?.id)}
                    ></div>
                  );
                })}
              </div>
            </div>
          )}
          {product.sizes?.length > 0 && (
            <div className="mb-2">
              <label
                htmlFor={`size-select-${product.id}`}
                className="block font-medium text-gray-700"
              >
                TALLA:
              </label>
              <div className="flex items-center space-x-2">
                {product.sizes.map((sizeId) => {
                  const size = sizes.find((s) => s.id === sizeId);
                  return (
                    <div
                      key={sizeId}
                      className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-center ${
                        size?.id === selectedSizes[index]
                          ? "border-2 border-black"
                          : ""
                      }`}
                      onClick={() => handleSizeChange(index, size?.id)}
                    >
                      {size?.value}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="ml-5 mb-6 flex justify-start mt-auto">
          <button
            className="bg-green-500 text-white py-2 px-1 rounded-lg text-sm hover:bg-blue-600 transition duration-300 flex items-center"
            onClick={() => handleAddToCart(product, index)}
          >
            <FaShoppingCart className="mr-2" />
            Agregar al carrito
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

  
  );
};

export default ProductList;
