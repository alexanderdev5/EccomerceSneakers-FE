import React from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const NewProductsCarousel = ({ nuevosProductos }) => {
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

  return (
    <section>
      {/* Renderizar el carrusel de Productos Nuevos */}
      <Carousel {...carouselSettings}>
        {nuevosProductos.map((producto) => {
          const {id,name, price, slug, imagen} = producto.attributes;

          const imagenx = imagen.data?.[0]?.attributes?.url;

          return (
            <div key={id} className="px-2">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="flex items-center justify-center h-48">
                  <Image
                    src={imagenx}
                    alt={name}
                    width={600}
                    height={400}
                    className="w-48 h-48 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-2">
                  {name}
                </h3>
                <p className="text-gray-600">
                  Precio: ${price}
                </p>
                <Link
                  href={`/product/${slug}`}
                  className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default NewProductsCarousel;
