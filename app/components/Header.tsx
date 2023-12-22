import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <>
      <header>
        <p className='text-center mt-8 text-xl'>
          28 Diciembre 2023 | 18.00
        </p>
        <Link className="text-center mt-4 mb-8 mx-auto block text-white text-3xl" to="/">
          1º Congreso Internacional de la Boletada
        </Link>
        <p className="font-sans text-center mb-8">
          Un grupo de jovenes emprendedores han decidido organizar el primer
          congreso internacional de la boletada. En este congreso se reunirán
          los mejores ponentes del mundo para hablar sobre la comedia y la
          boletada.
        </p>
      </header>
      <div className='mb-12'>
        <a href='https://ti.to/bolet-con/2024' target='_blank' rel='noopener noreferrer'>
          <button className='text-xl block w-max font-sans font-medium py-4 px-6 rounded-md mx-auto bg-white shadow-md transition-shadow hover:shadow-lg hover:bg-gray-100'>¡Consigue tu entrada!</button>
        </a>
        <p className='font-sans text-center mt-2 mb-4'>
          Solo quedan <strong className='text-lg'>12</strong>
        </p>
      </div>
    </>
  )
}
