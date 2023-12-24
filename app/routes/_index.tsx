import type { V2_MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react'
import Card from '~/components/Card'
import type { ParsedMarkdown} from '~/lib/content.server';
import { getContentFolder } from '~/lib/content.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Bolet Con' }]
}

const START_DATE = new Date('2023-12-28T19:00:00+01:00')
const DEFAULT_TALK_DURATION = 35 // minutes

function processTalkDates(talks: Talk[]) {
  for (const talk of talks) {
    const prevTalk = talks[talk.order - 1]
    const prevTalkEndDate = prevTalk ? prevTalk.endDate : START_DATE.getTime()
    const durationMs = (talk.duration || DEFAULT_TALK_DURATION) * 60 * 1000
    talk.startDate = prevTalkEndDate
    talk.endDate = prevTalkEndDate + durationMs
    talk.duration = talk.duration || DEFAULT_TALK_DURATION
  }
  return talks
}

function parseTalkFile(file: ParsedMarkdown) {
  const { title, speaker_name, speaker_img, order, duration } = file.frontmatter
  return {
    id: file.filename,
    order,
    duration,
    title,
    description: file.body,
    startDate: 0,
    endDate: 0,
    speaker: {
      name: speaker_name,
      img: speaker_img
    },
  }
}

export type Talk = ReturnType<typeof parseTalkFile>

export const loader = async () => {
  const files = await getContentFolder('/talks')
  const sortedTalks = files
    .map(parseTalkFile)
    .sort((a, b) => a.order - b.order)

  const talks = processTalkDates(sortedTalks)

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
