import type { V2_MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react'
import Card from '~/components/Card'
import type { ParsedMarkdown} from '~/lib/content.server';
import { getContentFolder } from '~/lib/content.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Bolet Con' }]
}

function parseTalkFile(file: ParsedMarkdown) {
  const { title, speaker_name, speaker_img, start_time, end_time } = file.frontmatter
  return {
    id: file.filename,
    title,
    description: file.body,
    speaker: {
      name: speaker_name,
      img: speaker_img
    },
    start: start_time,
    end: end_time,
  }
}

export type Talk = ReturnType<typeof parseTalkFile>

export const loader = async () => {
  const files = await getContentFolder('/talks')
  const talks = files.map(parseTalkFile).sort((a, b) => (a.start || '').localeCompare(b.start || ''))
  return { talks, formUrl: process.env.FORM_URL }
}

export default function Talks() {
  const { talks, formUrl } = useLoaderData() as { talks: Talk[]; formUrl: string }
  return (
    <section>
      <h2 className='text-2xl font-bold text-center mb-4'>- Agenda -</h2>
      <p className='mx-auto mb-6 text-center'>
        Usa <a href={formUrl} target='_blank' rel='noopener noreferrer' className='underline text-blue-600'>este formulario</a> para enviar una nueva charla o sugerir una modificación a una ya existente
      </p>
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
          No talks scheduled yet.
        </p>
      )}
    </section>
  )
}
