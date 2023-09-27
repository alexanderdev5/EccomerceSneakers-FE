import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "@/utils/api";
import Image from "next/image";
import Cart from "../cart";

const ListaProductos = ({ products }) => {
  const dispatch = useDispatch();

  // Estado local
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  // Nuevo estado para almacenar el índice de la imagen que está siendo hovereada
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  // Handlers de eventos
  const handleColorChange = (index, color) => {
    const newSelectedColors = [...selectedColors];
    newSelectedColors[index] = color || ''; // Usar un espacio en blanco si color es falsy
    setSelectedColors(newSelectedColors);
  
    console.log("selectedColors:", newSelectedColors);
  };
  
  const handleSizeChange = (index, size) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = size || ''; // Usar un espacio en blanco si size es falsy
    setSelectedSizes(newSelectedSizes);
  
    console.log("selectedSizes:", newSelectedSizes);
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
    const { colors, sizes } = product.attributes;
    const selectedColor = selectedColors[index];
    const selectedSize = selectedSizes[index];
  
    const hasColors = colors?.data?.length > 0;
    const hasSizes = sizes?.data?.length > 0;
  
    const addToCartSuccessMessage = `Se agregó '${product.attributes.name}' al carrito.`;
    const selectionErrorMessage = `Por favor, selecciona un color y una talla para '${product.attributes.name}'`;
  
    if ((!hasColors || selectedColor) && (!hasSizes || selectedSize)) {
      dispatch(
        addToCart({
          name: product.attributes.name,
          description: product.attributes.description,
          price: product.attributes.price,
          miniatura: product.attributes.miniatura?.data?.[0]?.attributes?.url || "",
          selectedColor,
          selectedSize,
        })
      );
  
      console.log(addToCartSuccessMessage);
      toast.success(addToCartSuccessMessage, {
        duration: 1000,
        style: {
          background: "white",
          color: "black",
        },
      });
  
      resetSelections(index);
    } else {
      console.log(selectionErrorMessage);
      toast.error(selectionErrorMessage, {
        duration: 1000,
        style: {
          background: "white",
          color: "black",
        },
      });
    }
  };
  
  
  // Nuevo manejador de eventos para el hover en una imagen
  const handleImageHover = (index) => {
    setHoveredImageIndex(index);
  };

  // Renderizado
  return (
    <>

<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Primera columna para mostrar productos */}
        <div className="col-span-1 md:col-span-3">
        <div className="max-w-8xl mx-auto">
        <Toaster position="top-center" />

        <h2 className="text-3xl font-semibold mb-8 text-center md:text-left">
          Lista de Productos (COLOR y SIZE)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          {products?.data?.map((product, index) => {
            const {
              id,
              name,
              slug,
              price,
              description,
              sizes,
              colors,
              miniatura,
            } = product.attributes;

            const miniaturaUrl = miniatura?.data?.[0]?.attributes?.url || "";
            const hoverMiniatura = miniatura?.data?.[1]?.attributes?.url || "";
            
            return (
              <div
                key={id}
                className="border rounded-lg overflow-hidden flex flex-col"
              >
                <div className="p-2 flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{name}</h3>
                  <Image
                    src={
                      index === hoveredImageIndex
                        ? hoverMiniatura
                        : miniaturaUrl
                    }
                    alt={name}
                    width={600}
                    height={600}
                    className="w-48 h-48 rounded-md mb-2 mr-4 sm:w-48 sm:h-48 md:w-48 md:h-48
                    cursor-pointer duration-200 hover:scale-105"
                    priority="true"
                    onMouseEnter={() => handleImageHover(index)} // Cambia onMouseOver a onMouseEnter
                    onMouseLeave={() => handleImageHover(null)} // Cambia onMouseOut a onMouseLeave
                  />
                  <p className="text-gray-600 mb-2">Precio: ${price}</p>
                  <p className="text-gray-600 mb-2">{description}</p>
                  {colors?.data?.length > 0 && (
                    <div className="mb-2">
                      <label
                        htmlFor={`color-select-${colors.data[0].id}`}
                        className="block font-medium text-gray-700"
                      >
                        COLOR:
                      </label>
                      <div className="flex items-center space-x-2">
                        {colors?.data?.map((color) => {
                          const colorName = color.attributes.name;
                          return (
                            <div
                              key={color.id}
                              className={`w-8 h-8 rounded-full cursor-pointer ${
                                colorName === selectedColors[index]
                                  ? "border-2 border-black"
                                  : ""
                              }`}
                              style={{
                                backgroundColor: color.attributes.value,
                              }}
                              onClick={() =>
                                handleColorChange(index, colorName)
                              } // Almacena el nombre del color
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {sizes?.data?.length > 0 && (
                    <div className="mb-2">
                      <label
                        htmlFor={`size-select-${sizes.data[0].id}`}
                        className="block font-medium text-gray-700"
                      >
                        TALLA:
                      </label>
                      <div className="flex items-center space-x-2">
                        {sizes?.data?.map((size) => {
                          const sizeValue = size.attributes.value; // Cambiar a size.name si tienes la propiedad name en tus datos
                          return (
                            <div
                              key={size.id}
                              className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-center ${
                                sizeValue === selectedSizes[index]
                                  ? "border-2 border-black"
                                  : "bg-gray-300" // Establece el color de fondo gris
                              }`}
                              onClick={() => handleSizeChange(index, sizeValue)} // Almacena el nombre de la talla
                            >
                              {sizeValue}
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
            );
          })}
        </div>
      </div>
        </div>

        {/* Segunda columna para el carrito de compras */}
        <div className="col-span-1">
          <Cart />
        </div>
      </div>










      
    </>
  );
};

export default ListaProductos;

export async function getStaticProps() {
  const products = await fetchDataFromApi(`/api/products?populate=*`);
  return {
    props: {
      products,
    },
  };
}
