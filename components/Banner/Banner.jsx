import React,{useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Asegúrate de importar los estilos

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from 'next/image';
const Banner = ({ banners }) => {
  const [isMobile, setIsMobile] = useState(false);

  const { imagen } = banners.attributes;
  const renderCarouselArrows = (onClickHandler, hasArrow, label, direction) => {
    if (!hasArrow) return null;

    return (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        aria-label={direction}
        role="button"
        className={`absolute ${
          direction === "prev" ? "left-0" : "right-0"
        } top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md`}
      >
        {direction === "prev" ? (
          <MdKeyboardArrowLeft size={isMobile ? 16 : 24} /> // Tamaño de icono condicional
        ) : (
          <MdKeyboardArrowRight size={isMobile ? 16 : 24} /> // Tamaño de icono condicional
        )}
      </button>
    );
  };
  return (
    <div className="relative">
      <Carousel
        //showArrows={false} Opcional: muestra o oculta las flechas de navegación
        showThumbs={false} // Opcional: muestra o oculta los thumbnails de navegación
        infiniteLoop={true} // Opcional: habilita el bucle infinito
        autoPlay={true} // Opcional: inicia la reproducción automática
        interval={3000} // Opcional: define el intervalo de tiempo en milisegundos
        useKeyboardArrows={true} // Opcional: permite la navegación con las teclas del teclado
        stopOnHover={true} // Opcional: detiene la reproducción automática al pasar el mouse sobre el carrusel
        //showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          renderCarouselArrows(onClickHandler, hasPrev, label, "prev")
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          renderCarouselArrows(onClickHandler, hasNext, label, "next")
        }
     >
        {imagen?.data?.map((image, index) => {
          const { url } = image.attributes;
          console.log("url", url);
          return (
            <div
              key={index}
              className="h-[260px] md:h-[600px] bg-cover bg-center relative"
            >
              <Image
                src={url}
                alt={`Imagen ${index}`}
                width={1200} // Ajusta el ancho según tus necesidades
                height={500} // Ajusta la altura según tus necesidades
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
