import { useRouteLoaderData, Link } from "react-router"
import type { Year } from "~/lib/talks"

export default function Footer() {
  const { years } = useRouteLoaderData("root") as { years: Year[] }
  return (
    <footer>
      <p className='text-center mt-8 mb-2'>
        🥳 🥳 🥳
      </p>
      <p className='text-center mb-8'>
        Gracias por tu inter&eacute;s en el Congreso Internacional de la Boletada.
      </p>
      <div className="flex items-center gap-2 my-4">
        <p className="flex-grow">
          Made with{' '}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path
              d="M17 16C15.8 17.3235 12.5 20.5 12.5 20.5C12.5 20.5 9.2 17.3235 8 16C5.2 12.9118 4.5 11.7059 4.5 9.5C4.5 7.29412 6.1 5.5 8.5 5.5C10.5 5.5 11.7 6.82353 12.5 8.14706C13.3 6.82353 14.5 5.5 16.5 5.5C18.9 5.5 20.5 7.29412 20.5 9.5C20.5 11.7059 19.8 12.9118 17 16Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
            ></path>
          </svg>{' '}
        </p>
        <a
          className='underline'
          href='https://pressunto.fly.dev/edit?repo=juandjara/bolet-conf&file=content/talks/intro.md'
          target='_blank'
          rel='noopener noreferrer'
        >
          Edit
        </a>
      </div>
      <div className="my-4">
        <span>Ediciones: </span>
        {years.map((y) => (
          <Link key={y.year} to={`/${y.year}`} className='mx-2 underline'>
            {y.year}
          </Link>
        ))}
      </div>
    </footer>
  )
}
