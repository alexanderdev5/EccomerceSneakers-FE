import Image from "next/image";
import { Inter } from "next/font/google";
import ProductList from "@/components/ProductList";
import Cart from "./cart";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout pagina="Inicio">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Primera columna para mostrar productos */}
        <div className="col-span-1 md:col-span-3">
          <ProductList />
        </div>

        {/* Segunda columna para el carrito de compras */}
        <div className="col-span-1">
          <Cart />
        </div>
      </div>
    </Layout>
  );
}
