import Layout from '@/components/Layout';
import React from 'react';

const AboutUs = () => {
  return (
    <Layout pagina="Acerca de Nosotros">
      <div className='px-24 py-5'>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-semibold mb-8">ACERCA DE NOSOTROS</h1>
            <p className="text-lg text-gray-700">
              Somos una agencia de ropa líder en la industria, comprometida con la calidad y la innovación.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
                <p className="text-gray-700">
                  En nuestra agencia, nos esforzamos por confeccionar los mejores polos, polerones y zapatillas
                  que puedas encontrar en el mercado. También somos expertos en diseño de logotipos y estampado
                  de logos en poleras y polos. Nuestra misión es brindarte productos de alta calidad que destaquen
                  tu estilo y tu marca.
                </p>
              </div>

              <div>
                <img src="/images/about-image.jpg" alt="Nuestra Empresa" className="rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h2>
            <p className="text-lg text-gray-700">
              En nuestra agencia, nos enorgullece nuestra pasión por la moda, nuestro compromiso con la calidad
              y nuestra dedicación para satisfacer las necesidades de nuestros clientes. Con años de experiencia
              en la industria, hemos establecido una reputación de excelencia y creatividad en cada prenda que
              confeccionamos y en cada diseño de logo que creamos.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Nuestros Servicios</h2>
                <ul className="list-disc pl-6 text-lg">
                  <li>Confección de polos y polerones de alta calidad.</li>
                  <li>Diseño de logotipos creativos y personalizados.</li>
                  <li>Estampado de logotipos en poleras y polos con la mejor técnica.</li>
                  <li>Amplia gama de productos y opciones de personalización.</li>
                  <li>Entrega rápida y servicio al cliente excepcional.</li>
                </ul>
              </div>

              <div>
                <img src="/images/services-image.jpg" alt="Nuestros Servicios" className="rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
                <ul className="list-disc pl-6 text-lg">
                  <li>Compromiso con la calidad y la artesanía.</li>
                  <li>Innovación constante en diseño y técnicas de estampado.</li>
                  <li>Colaboración cercana con nuestros clientes.</li>
                  <li>Sostenibilidad y responsabilidad ambiental.</li>
                  <li>Pasión por la moda y la creatividad.</li>
                </ul>
              </div>

              <div>
                <img src="/images/values-image.jpg" alt="Nuestros Valores" className="rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
                <p className="text-gray-700">
                  Desde nuestros humildes comienzos hasta convertirnos en una agencia líder en la industria, nuestra
                  historia está marcada por la dedicación, la pasión y la visión. Descubre cómo hemos crecido y evolucionado
                  a lo largo de los años.
                </p>
              </div>

              <div>
                <img src="/images/history-image.jpg" alt="Nuestra Historia" className="rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default AboutUs;
