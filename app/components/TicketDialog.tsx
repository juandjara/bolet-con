import { Transition, Dialog } from '@headlessui/react'
import { Fragment } from 'react';

export default function TicketDialog({ isOpen, closeModal }: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="font-sans relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-3 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Consigue tu entrada
                </Dialog.Title>
                <div className="my-6">
                  <label className="text-sm mb-1 block text-gray-500">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Escribe aquí tu nombre"
                    className="block w-full p-3 rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div className="my-6">
                  <label className="text-sm mb-1 block text-gray-500">Tipo de entrada</label>
                  <select className="block bg-gray-100 w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                    <option>Asistente</option>
                    <option>Ponente</option>
                  </select>
                </div>
                <TicketPreview />
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Descargar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

function TicketPreview({
  name = 'Alfredo, impresionista y buzo',
  type = 'Asistente',
  number = 1,
}: {
  name?: string;
  type?: 'Asistente' | 'Ponente';
  number?: number;
}) {
  return (
    <div className='bg-orange-200 p-3 rounded-lg'>
      <div className='flex items-start mb-6'>
        <h3 className='text-lg flex-grow font-medium leading-6 text-orange-700'>BOLET-CON</h3>
        <span className='text-4xl text-orange-500'>#{number}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-xs px-2 py-1 bg-white rounded-full'>{type}</span>
        <p className='text-grey-700'>{name}</p>
      </div>
    </div>
  )
}