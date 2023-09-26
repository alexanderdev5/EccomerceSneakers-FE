import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileMenu from "./MobileMenu"; // Asegúrate de importar el componente del menú aquí.

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/"
           className="flex items-center">
            <img
              src="/img/logo.png"
              alt="Imagen logo"
              className="h-12 w-auto"
            />
            <span className="text-white text-xl font-semibold ml-2">
              Tu Empresa
            </span>
          
        </Link>

        <nav className="hidden md:flex text-white space-x-6">
          <Link href="/" className={`hover:text-blue-500 ${router.pathname === "/" && "text-blue-500"}`}>Inicio
          </Link>
          <Link href="/nosotros"
             className={`hover:text-blue-500 ${router.pathname === "/nosotros" && "text-blue-500"}`}>Nosotros
          </Link>
          <Link href="/blog"
             className={`hover:text-blue-500 ${router.pathname === "/blog" && "text-blue-500"}`}>Blog
          </Link>
          <Link href="/tienda"
             className={`hover:text-blue-500 ${router.pathname === "/tienda" && "text-blue-500"}`}>Tienda
          </Link>
        </nav>

        {/* Botón del menú hamburguesa */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menú desplegable en modo móvil */}
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  );
};

export default Header;