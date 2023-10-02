import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "@/utils/api";
import Image from "next/image";
import Cart from "../cart";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Wrapper from "@/components/Wrapper";
import Typewriter from "typewriter-effect/dist/core";

const CatalogoProductos = ({ products }) => {
  const dispatch = useDispatch();

  // Estado local
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  // Nuevo estado para almacenar el índice de la imagen que está siendo hovereada
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  // Handlers de eventos
  const handleColorChange = (index, color) => {
    const newSelectedColors = [...selectedColors];
    newSelectedColors[index] = color || ""; // Usar un espacio en blanco si color es falsy
    setSelectedColors(newSelectedColors);

    console.log("selectedColors:", newSelectedColors);
  };

  const handleSizeChange = (index, size) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = size || ""; // Usar un espacio en blanco si size es falsy
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
    const selectionErrorMessage = `Elija color ó talla de '${product.attributes.name}'`;

    if ((!hasColors || selectedColor) && (!hasSizes || selectedSize)) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.attributes.name,
          description: product.attributes.description,
          price: parseFloat(product.attributes.price).toFixed(2), // Formatear el precio a 2 decimales
          miniatura:
            product.attributes.miniatura?.data?.[0]?.attributes?.url || "",
          selectedColor,
          selectedSize,
        })
      );

      console.log(addToCartSuccessMessage);
      toast.success(addToCartSuccessMessage, {
        // icon: '🚀', Puedes cambiar esto por el emoji que prefieras
        duration: 1600,
        style: {
          background: "white",
          color: "black",
        },
      });

      resetSelections(index);
    } else {
      console.log(selectionErrorMessage);
      toast.error(selectionErrorMessage, {
        position: "top-left",
        duration: 1300,
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
    <Layout pagina="Catálogo de Productos">
      <div className="px-10 py-5">
        <section className="bg-gray-200 py-20">
          <div className="container mx-auto text-center ">
            <h1 className="text-4xl font-semibold mb-8 text-black">
              CATALOGO DE ZAPATILLAS
            </h1>
            <p className="text-lg text-black">
              Somos una agencia de ropa líder en la industria, comprometida con
              la calidad y la innovación.
            </p>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen px-3 md:px-10 mt-10">
        {/* Primera columna para mostrar productos */}
        <div className="col-span-1 md:col-span-3">
          <div className="max-w-8xl mx-auto">
            <Toaster position="top-center" />

            <h2 className="text-3xl font-semibold mb-8 text-center md:text-left">
              TIENDA
            </h2>
            {/* Mobile filter select */}
    <div className="md:hidden text-center mb-4">
      <select
        className="bg-blue-500 text-white py-2 px-4 rounded-lg text-xl w-full"
        onChange={() => openModal()}
      >
        <option value="">Filtrar</option>
      </select>
    </div>

             {/* Filters row */}
  <div className="hidden md:flex flex-wrap justify-between items-center mb-6">
    {/* Category filter */}
    <div className="w-full md:w-1/5 mb-4">
      <label htmlFor="category-select" className="block font-medium text-gray-700">
        Categoría
      </label>
      <select
        id="category-select"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        // Add your category options here
      >
        <option>Todas</option>
        <option>Zapatillas deportivas</option>
        <option>Zapatos casuales</option>
        {/* Add more category options */}
      </select>
    </div>

    {/* Brand filter */}
    <div className="w-full md:w-1/5 mb-4">
      <label htmlFor="brand-select" className="block font-medium text-gray-700">
        Marca
      </label>
      <select
        id="brand-select"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        // Add your brand options here
      >
        <option>Todas</option>
        <option>Nike</option>
        <option>Adidas</option>
        {/* Add more brand options */}
      </select>
    </div>

    {/* Subcategory filter */}
    <div className="w-full md:w-1/5 mb-4">
      <label htmlFor="subcategory-select" className="block font-medium text-gray-700">
        Subcategoría
      </label>
      <select
        id="subcategory-select"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        // Add your subcategory options here
      >
        <option>Todas</option>
        <option>Running</option>
        <option>Basketball</option>
        {/* Add more subcategory options */}
      </select>
    </div>

    {/* Color filter */}
    <div className="w-full md:w-1/5 mb-4">
      <label htmlFor="color-select" className="block font-medium text-gray-700">
        Color
      </label>
      <select
        id="color-select"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        // Add your color options here
      >
        <option>Todos</option>
        <option>Rojo</option>
        <option>Azul</option>
        {/* Add more color options */}
      </select>
    </div>

    {/* Size filter */}
    <div className="w-full md:w-1/5 mb-4">
      <label htmlFor="size-select" className="block font-medium text-gray-700">
        Talla
      </label>
      <select
        id="size-select"
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        // Add your size options here
      >
        <option>Todas</option>
        <option>36</option>
        <option>37</option>
        {/* Add more size options */}
      </select>
    </div>
  </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
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

                const miniaturaUrl =
                  miniatura?.data?.[0]?.attributes?.url || "";
                const hoverMiniatura =
                  miniatura?.data?.[1]?.attributes?.url || "";

                return (
                  <motion.div
                    key={product.id}
                    className="border rounded-lg overflow-hidden flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }} // Ajusta la duración y el retraso de la animación
                  >
                    <div className="p-2 flex-grow">
                      <Image
                        src={
                          index === hoveredImageIndex
                            ? hoverMiniatura
                            : miniaturaUrl
                        }
                        alt={name}
                        width={600}
                        height={600}
                        className="w-48 h-48 rounded-md mb-2 mr-4 sm:w-48 sm:h-48 md:w-52 md:h-52 mx-auto cursor-pointer duration-200 hover:scale-105"
                        priority="true"
                        onMouseEnter={() => handleImageHover(index)}
                        onMouseLeave={() => handleImageHover(null)}
                      />

                      <p className="text-xl font-medium mt-4">{name}</p>
                      <p className="text-gray-600 mb-2 text-lg mt-2">
                        Precio: $ {price.toFixed(2)}
                      </p>
                      <p className="text-gray-600 mb-2  whitespace-normal overflow-hidden break-words">
  {description.length > 40 ? `${description.slice(0, 40)}...` : description}
</p>
                      {colors?.data?.length > 0 && (
                        <div className="my-2">
                          <label
                            htmlFor={`color-select-${colors.data[0].id}`}
                            className="block font-medium text-gray-700"
                          >
                            COLOR:
                            {selectedColors[index] && (
                              <span className="text-blue-500 ml-2">
                                {selectedColors[index]}
                              </span>
                            )}
                          </label>
                          <div className="flex items-center space-x-3">
                            {colors?.data?.map((color, idx) => {
                              const colorName = color.attributes.name;
                              const isSelected =
                                colorName === selectedColors[index];
                              const circleSize = isSelected ? "41px" : "10px"; // Ajusta el tamaño del círculo seleccionado

                              return (
                                <div
                                  key={color.id}
                                  className={`w-8 h-8 relative cursor-pointer my-2`}
                                  style={{
                                    backgroundColor: color.attributes.value,
                                    borderRadius: "50%",
                                  }}
                                  onClick={() =>
                                    handleColorChange(index, colorName)
                                  }
                                >
                                  {isSelected && (
                                    <div
                                      className="absolute inset-0 border-2 border-blue-500 rounded-full"
                                      style={{
                                        pointerEvents: "none",
                                        width: circleSize,
                                        height: circleSize,
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                      }}
                                    ></div>
                                  )}
                                  {isSelected && (
                                    <div
                                      className="absolute inset-0 flex items-center justify-center text-white"
                                      style={{ pointerEvents: "none" }}
                                    >
                                      <FaCheck size={12} />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {sizes?.data?.length > 0 && (
                        <div className="my-2">
                          <label
                            htmlFor={`size-select-${sizes.data[0].id}`}
                            className="block font-medium text-gray-700"
                          >
                            TALLA:
                            {selectedSizes[index] && (
                              <span className="text-blue-500 ml-2">
                                {selectedSizes[index]}
                              </span>
                            )}
                          </label>
                          <div className="flex items-center space-x-3">
                            {sizes?.data?.map((size) => {
                              const sizeValue = size.attributes.value; // Cambiar a size.name si tienes la propiedad name en tus datos
                              return (
                                <div
                                  key={size.id}
                                  className={`w-8 h-8 rounded cursor-pointer flex items-center justify-center text-center my-2 ${
                                    sizeValue === selectedSizes[index]
                                      ? "border-2 border-blue-600"
                                      : "bg-gray-300" // Establece el color de fondo gris
                                  }`}
                                  onClick={() =>
                                    handleSizeChange(index, sizeValue)
                                  } // Almacena el nombre de la talla
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Segunda columna para el carrito de compras 
          Esto se escribe para ocultar esta columna cuando se pone en Modo Mobile
           ---> hidden md:block  
        */}
        <div className="hidden md:block col-span-1">
          <Cart />
        </div>
      </div>
    </Layout>
  );
};

export default CatalogoProductos;

export async function getStaticProps() {
  const products = await fetchDataFromApi(`/api/products?populate=*`);
  return {
    props: {
      products,
    },
  };
}
