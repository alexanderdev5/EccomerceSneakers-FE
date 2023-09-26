import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MobileMenu = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(isOpen);

  // Función para abrir y cerrar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    onClose(); // Cerrar el menú al hacer clic en un enlace
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-black w-64 h-screen p-4">
        {/* Botón para cerrar el menú */}
        <button
          className="absolute top-2 right-2 text-gray-700 text-xl"
          onClick={toggleMenu}
        >
          X
        </button>
        <nav className="bg-transparent w-64 h-screen p-4">

          <Link href="/">
            <span
              onClick={toggleMenu}
              className={`block py-2 border-b-2 ${
                router.pathname === "/" ? "border-blue-500" : ""
              }`}
            >
              Inicio
            </span>
          </Link>
          <Link href="/nosotros">
            <span
              onClick={toggleMenu}
              className={`block py-2 border-b-2 ${
                router.pathname === "/nosotros" ? "border-blue-500" : ""
              }`}
            >
              Nosotros
            </span>
          </Link>
          <Link href="/blog">
            <span
              onClick={toggleMenu}
              className={`block py-2 border-b-2 ${
                router.pathname === "/blog" ? "border-blue-500" : ""
              }`}
            >
              Blog
            </span>
          </Link>
          <Link href="/tienda">
            <span
              onClick={toggleMenu}
              className={`block py-2 border-b-2 ${
                router.pathname === "/tienda" ? "border-blue-500" : ""
              }`}
            >
              Tienda
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
