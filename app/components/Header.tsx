import { useLoaderData, useRouteLoaderData } from "react-router"
import type { Year } from "~/lib/talks"
import MDX from "./MDX"

export default function Header() {
  const { year } = useLoaderData() as { year: number }
  const { years } = useRouteLoaderData("root") as { years: Year[] }
  const yearData = years.find((y) => y.year === year)

  if (!yearData) {
    return null
  }

  return (
    <header>
      <p className='text-center mt-8 text-xl'>
        {yearData.date}
      </p>
      <p className="text-center mt-4 mb-8 mx-auto text-white text-3xl">
        {yearData.title}
      </p>
      <p className="font-sans text-center mb-8">
        <MDX html={yearData.body} />
      </p>
    </header>
  )
}