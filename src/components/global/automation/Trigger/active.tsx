'use client'
import { Instagram, PlaneTakeoff } from 'lucide-react'
import React from 'react'

type Props = {
    type: string
    keywords: {
        id: string
        word: string
        automationId: string
    }[]
}

const ActiveTrigger = ({keywords, type}: Props) => {
  return (
    <div className='bg-[#2b2b2b] p-3 rounded-xl w-full'>
        <div className='flex gap-x-2 items-center mb-2'>
            {type === "COMMENT" ? <Instagram/> : <PlaneTakeoff/>}
            <p className='text-lg'>
                {type === "COMMENT"
                    ? 'User comments on my post.'
                    : 'User sends me a direct message'
                }
            </p>
        </div>
        <p className='text-gray-400'>
            {type === "COMMENT"
                ? 'If the user comments on a video that is setup to listen for kewywords , this automation will fire'
                : 'If the user send you a message that contains a keyword , this automation will fire'
            }
        </p>
        <div className='flex gap-2 mt-5 flex-wrap'>
            {keywords.map((word)=> (
                <div 
                    key={word.id}
                    className='bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full'
                >
                  <p>{word.word}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ActiveTrigger