import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
        <footer >
            <div className={""}>
            <nav className={""}>
            <Link href="/">Inicio</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/tienda">Tienda</Link>
          </nav>
          <p className={""}>Todos los derechos reservados</p>
            </div>
        </footer>
  )
}

export default Footer