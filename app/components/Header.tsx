import { Link } from "@remix-run/react";
import { useState } from "react";
import TicketDialog from "./TicketDialog";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false)

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
        <button
          onClick={() => setModalOpen(true)}
          className='text-xl block font-sans font-medium py-4 px-6 rounded-md mx-auto bg-white shadow-md transition-shadow hover:shadow-lg hover:bg-gray-100'>
          ¡Consigue tu entrada!
        </button>
        <p className='font-sans text-center mt-2 mb-4'>
          Solo quedan <strong className='text-lg'>12</strong>
        </p>
      </div>
      <TicketDialog isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
    </>
  )
}
