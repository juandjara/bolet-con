import { useRouteLoaderData } from "react-router"

const BASE_URL = 'https://www.google.com/maps/embed/v1/place'

export default function Map() {
  const { address, gmapsKey } = useRouteLoaderData("root") as { gmapsKey: string; address: string }

  if (typeof window === 'undefined') return null
  if (!gmapsKey) {
    return (
      <div className='text-center'>
        <p className='text-xl font-bold'>- C&oacute;mo llegar -</p>
        <p className='text-lg'>No se ha encontrado la API de Google Maps</p>
      </div>
    )
  }

  const url = `${BASE_URL}?key=${gmapsKey}&q=${address}`

  return (
    <>
      <h2 className='text-2xl font-bold text-center mb-4'>- C&oacute;mo llegar -</h2>
      <iframe
        title="Google Maps"
        width="100%"
        height="450"
        style={{ border: 0, borderRadius: '8px', marginBottom: '2rem' }}
        src={url}
      ></iframe>
    </>
  )
}
