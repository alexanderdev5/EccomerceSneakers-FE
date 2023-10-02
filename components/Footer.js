// components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-10">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row justify-center items-center">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Nuestra Tienda de Sneakers</h2>
          <p className="text-sm">Descubre la mejor selección de sneakers y accesorios a precios increíbles.</p>
          <p className="text-xs mt-4">© {new Date().getFullYear()} Tu Tienda de Sneakers</p>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Enlaces Rápidos</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="/">Inicio</a></li>
            <li className="mb-2"><a href="/catalogo">Catálogo</a></li>
            <li className="mb-2"><a href="/contacto">Contacto</a></li>
            <li className="mb-2"><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Productos Destacados</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="/catalogo/nike-air-max">Nike Air Max</a></li>
            <li className="mb-2"><a href="/catalogo/adidas-ultraboost">Adidas UltraBoost</a></li>
            <li className="mb-2"><a href="/catalogo/jordan-1">Jordan 1</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Síguenos</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="https://www.facebook.com/tu-tienda-de-sneakers" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li className="mb-2"><a href="https://www.instagram.com/tu-tienda-de-sneakers" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li className="mb-2"><a href="https://twitter.com/tu-tienda-de-sneakers" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          </ul>
        </div>
      </div>
      
      {/* Imágenes de Tarjetas de Crédito */}
      <div className="container mx-auto mt-6 text-center">
        <div className="flex flex-wrap justify-center">
          <img src="/visa.png" alt="Visa" className="w-12 h-8 mx-2" />
          <img src="/mastercard.png" alt="MasterCard" className="w-12 h-8 mx-2" />
          <img src="/amex.png" alt="American Express" className="w-12 h-8 mx-2" />
          <img src="/discover.png" alt="Discover" className="w-12 h-8 mx-2" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
