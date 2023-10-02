import React from "react";
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
      <div className="flex flex-col items-center">
        <Image src="/logo.png" height={150} width={150} alt="imagen logo" priority={true} />
        <span className="text-2xl font-medium">Cargando...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;