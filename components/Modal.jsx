import React, { useState } from "react";
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";

const Modal = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    console.log("Búsqueda realizada:", searchText);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
        zIndex: 1000, // Z-index alto para que esté por encima de otros elementos
      }}
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg w-96 modal-content"
        onClick={(e) => e.stopPropagation()} // Evita que los clics en el modal lo cierren
        style={{
          position: "relative", // Asegura que el botón Cerrar esté dentro del modal
          zIndex: 1001, // Z-index superior para el contenido del modal
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Búsqueda de productos</h2>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchText}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Buscar
        </button>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
