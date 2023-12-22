import { ClockIcon } from '@heroicons/react/20/solid'
import type { Talk } from '~/routes/_index'
import MDX from './MDX'

export default function Card({ talk }: { talk: Talk }) {
  const firstImage = talk.speaker.img
  const duration = new Date(`2023-12-28T${talk.end}:00Z`).getTime() - new Date(`2023-12-28T${talk.start}:00Z`).getTime()
  
  return (
    <div>
      <p className="text-white text-sm p-2 flex items-center">
        <ClockIcon className='inline-block w-4 h-4 mr-1' />
        {/* <span>{formatDate(talk.start)}</span>
        <span>-</span>
        <span>{formatDate(talk.end)}</span> */}
        <span>{talk.start} - {talk.end}</span>
        <span className='mx-2'>|</span>
        <span>{Math.floor(duration / 1000 / 60)} min</span>
      </p>
      <div className='bg-white shadow rounded-md w-full p-3'>
        <h3 className='font-light text-xl'>{talk.title}</h3>
        <p className="font-sans text-gray-600 py-2">
          <MDX html={talk.description} />
        </p>
        <div className='flex items-center gap-2 mt-2'>
          {firstImage ? (
            <img
              alt=""
              src={firstImage}
              width={40}
              height={40}
              className='rounded-full flex-shrink-0'
            />
          ) : <div className='rounded-full flex-shrink-0 w-10 h-10 bg-gray-300' />}
          <p className="text-xs text-gray-500 my-2">
            {talk.speaker.name}
          </p>
        </div>
      </div>
    </div>
  )
}
