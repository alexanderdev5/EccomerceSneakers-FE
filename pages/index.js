import Image from "next/image";
import { Inter } from "next/font/google";
import { fetchDataFromApi } from "@/utils/api";
import Cart from "./cart";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Layout from "@/components/Layout";
import styles from "../styles/Home.module.css"; // Importa los estilos CSS
import Banner from "@/components/Banner/Banner";
import Wrapper from "@/components/Wrapper";
import NewProductsCarousel from "@/components/HomeProductos/NewProductsCarousel";
import SaleProductsCarousel from "@/components/HomeProductos/SaleProductsCarousel";
import StockProductsCarousel from "@/components/HomeProductos/StockProductsCarousel";


// Configuración del carrusel
const carouselSettings = {
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,

      slidesToSlide: 6, // Show 4 product per slide on desktop
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,

      slidesToSlide: 5, // Show 4 product per slide on desktop
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,

      slidesToSlide: 2, // Show 4 product per slide on desktop
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // Show 4 product per slide on desktop
    },
  },
  showDots: true, // Mostrar dots
  arrows: true, // Mostrar flechas de navegación
  autoPlay: true,
  autoPlaySpeed: 8000,
  infinite: true,
};

function StyledHeading({ text }) {
  return (
    <div className="flex flex-col items-center my-5 mt-14">
      <div className=" text-white py-4 text-center">
        <div className="inline-flex items-center">
          <div className="w-1/2 h-px bg-black"></div>
          <h2 className="text-lg md:text-2xl font-bold mx-6 text-black">
            {text}
          </h2>
          <div className="w-1/2 h-px bg-black"></div>
        </div>
      </div>
    </div>
  );
}


const Home = ({ banners, products }) => {
  // Filtrar productos nuevos
  const nuevosProductos = products
    .filter((producto) => {
      // Verificar si el atributo "value" es "nuevo"
      return (
        producto.attributes.atributo &&
        producto.attributes.atributo.data.attributes.value === "nuevo"
      );
    })
    .slice(0, 15); // Limitar a 15 productos

  // Filtrar productos en oferta
  const productosEnOferta = products
    .filter((producto) => {
      // Verificar si el atributo "value" es "oferta"
      return (
        producto.attributes.atributo &&
        producto.attributes.atributo.data.attributes.value === "oferta"
      );
    })
    .slice(0, 15); // Limitar a 15 productos

     // Filtrar productos en Stock
  const productosEnStock = products
  .filter((producto) => {
    // Verificar si el atributo "value" es "oferta"
    return (
      producto.attributes.atributo &&
      producto.attributes.atributo.data.attributes.value === "stock"
    );
  })
  .slice(0, 15); // Limitar a 15 productos

    
  return (
    <Layout pagina="Inicio">
      <Banner banners={banners} />

      <div className="container mx-auto min-h-screen px-3 md:px-14 lg:px-16 xl:">
        {/* Carrusel de Productos Nuevos */}
        <StyledHeading text="Productos Nuevos" />
        <NewProductsCarousel nuevosProductos={nuevosProductos} />

        {/* Carrusel de Productos en Oferta */}
        <StyledHeading text="Productos en Oferta" />
        <SaleProductsCarousel productosEnOferta={productosEnOferta} />
        
        {/* Resto del código... */}
        <StyledHeading text="Productos en Stock" />
        <StockProductsCarousel productosEnStock={productosEnStock} />
        
        
      </div>
    </Layout>
  );
};



export default Home;

export async function getStaticProps() {
  const banners = await fetchDataFromApi(`/api/banner?populate=*`);
 const products = await fetchDataFromApi(`/api/products?populate=*`);

  return {
    props: {
      // Aquí asignamos directamente los datos a la variable banners
      products:products.data,
      banners: banners.data,
    },
  };
}



