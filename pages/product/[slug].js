import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "@/components/Layout";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { fetchDataFromApi } from "@/utils/api";
import Image from "next/image";

const ProductDetails = ({ product }) => {
  const { name, price, miniatura, imagen,atributo } = product?.attributes || {};
  const miniaturaImages = miniatura?.data || [];
  const imagenImages = imagen?.data || [];
  const detalleatributo = atributo?.data || {};

console.log("atributo", detalleatributo);

  const [currentImage, setCurrentImage] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    focusOnSelect: true,
    afterChange: (currentSlide) => setCurrentImage(currentSlide),
  };

  return (
    <Layout pagina={`${name}`}>
      <div className="container mx-auto px-5 py-10 md:flex">
        {/* Contenedor de miniaturas en forma vertical para desktop */}
        <div className="md:w-1/6 mb-2 md:mb-0">
          <div className="hidden md:flex flex-col items-center space-y-2">
            {miniaturaImages.map((imageUrl, index) => (
              <div key={index} className="my-2">
                <div
                  className={`thumbnail ${
                    currentImage === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <Image
                    src={imageUrl.attributes.url}
                    alt={`Thumbnail ${index}`}
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 mx-auto relative">
  <div className="main-image mb-5 relative overflow-hidden">
    <Image
      src={imagenImages[currentImage]?.attributes.url || ""}
      alt="Producto"
      className="h-auto rounded-xl transition-transform duration-300 transform hover:scale-105 hover:rounded-xl"
      width={600}
      height={400}
    />
    <span
      style={{
        backgroundColor: detalleatributo?.attributes?.bgcolor,
        width: '80px', // Define el ancho deseado
        height: '80px', // Define la altura deseada
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%', // Hace que el elemento sea un círculo
        position: 'absolute',
        top: '12px', // Ajusta la distancia desde la parte superior
        right: '8px', // Ajusta la distancia desde la derecha
      }}
      className="text-white font-semibold"
    >
      {detalleatributo?.attributes?.name}
    </span>
  </div>
</div>

        {/* Contenedor de miniaturas en forma horizontal para móvil */}
        <div className="md:w-1/2 md:pl-3 block sm:hidden">
          <div className="flex justify-center space-x-2">
            {miniaturaImages.map((imageUrl, index) => (
              <div key={index}>
                <div
                  className={`thumbnail ${
                    currentImage === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <Image
                    src={imageUrl.attributes.url}
                    alt={`Thumbnail ${index}`}
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 md:pl-5 my-5">
          <h1 className="text-4xl font-semibold mb-4">{name}</h1>
          <p className="text-2xl text-gray-700 mb-4">$. {price?.toFixed(2)}</p>
          <p className="text-lg text-gray-700 mb-4">Color: Azul</p>
          <p className="text-lg text-gray-700 mb-4">Talla: L</p>
          <div className="mb-4 flex flex-row justify-start">
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg mr-4 hover:bg-gray-700 flex items-center">
              <AiOutlineShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 flex items-center">
              <AiOutlineHeart className="mr-2" />
              Favorite
            </button>
          </div>
          <p className="text-lg">Descripción del Producto:</p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            ac diam sit amet quam vehicula elementum sed sit amet dui.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  // Para mostrar productos "que deben interesarte ... "
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: {
      product: product.data?.[0] || {}, // Utiliza product.data[0] o un objeto vacío como valor por defecto
      products: products.data,
    },
  };
}
