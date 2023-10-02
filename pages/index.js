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


// Configuración del carrusel
const carouselSettings = {
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,

      slidesToSlide: 5, // Show 4 product per slide on desktop
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,

      slidesToSlide: 4, // Show 4 product per slide on desktop
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

const Home = ({banners,products}) => {
  console.log("banners",banners)
  return (
    <Layout pagina="Inicio">
      <Banner banners={banners}/>

      <div className="container mx-auto min-h-screen px-3 md:px-14 lg:px-16 xl:">
        {/* Carrusel de Productos Nuevos */}
        <section>
          <StyledHeading text="Productos Nuevos" />
          <Carousel {...carouselSettings}>
            {nuevosProductos.map((producto) => (
              <div key={producto.id} className="px-2">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-48 object-cover"
                  />
                  <h3 className="text-xl font-semibold mt-2">
                    {producto.nombre}
                  </h3>
                  <p className="text-gray-600">Precio: ${producto.precio}</p>
                  <Link
                    href={`/producto/${producto.id}`}
                    className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </section>

        {/* Carrusel de Productos en Oferta */}
        <section className="mb-6 mt-12">
          <StyledHeading text="Productos en Oferta" />
          <Carousel {...carouselSettings}>
            {productosEnOferta.map((producto) => (
              <div key={producto.id} className="px-2">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-48 object-cover"
                  />
                  <h3 className="text-xl font-semibold mt-2">
                    {producto.nombre}
                  </h3>
                  <p className="text-gray-600">Precio: ${producto.precio}</p>
                  <Link
                    href={`/producto/${producto.id}`}
                    className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
      </div>


    </Layout>
  );
};

export default Home;

export async function getStaticProps({name}) {
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



