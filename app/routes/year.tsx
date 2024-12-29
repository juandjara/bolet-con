import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import Card from '~/components/Card'
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Map from '~/components/Map';
import { getContentFolder } from '~/lib/content.server'
import type { Talk, Year } from '~/lib/talks';
import { parseTalkFile, processTalkDates } from '~/lib/talks';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const year = Number(params.year ?? 0)
  const files = await getContentFolder(`/talks/${year}`)
  const sortedTalks = files
    .map(parseTalkFile)
    .sort((a, b) => a.order - b.order)

  const talks = processTalkDates(sortedTalks)

  return {
    talks,
    year,
    // formUrl: process.env.FORM_URL
  }
}

function Talks({ talks }: { talks: Talk[] }) {
  // const { talks, formUrl } = useLoaderData() as { talks: Talk[]; formUrl: string }
  return (
    <section>
      <h2 className='text-2xl font-bold text-center mb-4'>- Agenda -</h2>
      {/* <p className='mx-auto mb-6 text-center'>
        Usa <a href={formUrl} target='_blank' rel='noopener noreferrer' className='underline text-blue-600'>este formulario</a> para enviar una nueva charla o sugerir una modificación a una ya existente
      </p> */}
      {talks?.length ? (
        <ul className='space-y-6'>
          {talks.map((talk) => (
            <Card
              key={talk.id}
              talk={talk}
            />
          ))}
        </ul>
      ) : (
        <p className='text-center py-3'>
          No hay charlas todavia
        </p>
      )}
    </section>
  )
}

export default function Year() {
  const { talks } = useLoaderData<typeof loader>()

  return (
    <div className='mx-auto max-w-screen-md px-2'>
      <Header />
      <main className='mb-12'>
        <Talks talks={talks} />
      </main>
      <Map />
      <Footer />
    </div>
  )
}
