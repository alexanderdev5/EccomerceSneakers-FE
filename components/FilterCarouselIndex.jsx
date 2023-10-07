import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Configuración del carrusel
const carouselSettings = {
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 5, // Show 5 product per slide on super large desktop
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // Show 4 product per slide on desktop
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // Show 2 product per slide on tablet
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // Show 1 product per slide on mobile
    },
  },
  showDots: true, // Show dots
  arrows: true, // Show navigation arrows
  autoPlay: true,
  autoPlaySpeed: 8000,
  infinite: true,
};

function StyledHeading({ text }) {
  return (
    <div className="flex flex-col items-center my-5 mt-14">
      <div className="text-white py-4 text-center">
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

const FilterCarouselIndex = ({ products }) => {
  if (!products || products.length === 0) {
    // Handle the case where products are undefined or empty
    return (
      <div className="container mx-auto min-h-screen">
        <p>No new products available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-3 md:px-14 lg:px-16 xl:">
      {/* Carrusel de Productos Nuevos */}
      <section>
        <StyledHeading text="Productos Nuevos" />
        <Carousel {...carouselSettings}>
          {products.map((producto) => (
            <div key={producto.id} className="px-2">
              {/* Rest of your carousel rendering code */}
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
};


export default FilterCarouselIndex;
