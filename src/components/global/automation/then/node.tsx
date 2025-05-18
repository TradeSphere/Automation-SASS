"use client"

import { Separator } from '@/components/ui/separator'
import { useQueryAutomation } from '@/Hook/user-queries'
import { Instagram } from 'lucide-react'
import React from 'react'
import PostButton from '../post'

type Props = {
    id: string
}

const ThenNode = ( {id}: Props) => {
  const { data } = useQueryAutomation(id) 
  const commentTrigger = data?.data?.trigger.find((t) => t.type === 'COMMENT')
  
  return !data?.data?.listner ? ( 
    <></>
  ) : (
  <div
    className='w-ful lg:w-10/12 relative xl:w-6/12 p-5 rounded-xl flex flex-col
    bg-[#1D1D1D] gap-y-3' 
  >
    <div className='absolute h-20 left-1/2 bottom-full flex 
    flex-col items-center z-50'>
        <span className='h-[9px] w-[9px] rounded-full bg-slate-300'></span>
        <Separator  
            orientation='vertical'
            className='bottom-full flex-1 border-[1px] bg-slate-800'
        />
        <span className='h-[9px] w-[9px] rounded-full bg-slate-300'></span>
    </div>
    <div className='flex gap-x-2'
    >
        {/* <Warning /> ICON HERE */}
        Then ...
    </div>
    <div className='bg-[#2a2a2a] p-3 rounded-xl flex flex-col gap-y-2'>
        <div className='flex gap-x-2 items-center'>
            {data.data.listner.listener === 'MESSAGE' ? <Instagram/> : <meta /> }
            <p className='text-lg'>
                {data.data.listner.listener === "MESSAGE" 
                    ? "send user a message" 
                    : "let smart ai take over"
                }
            </p>
        </div>
        <p className="font-light text-gray-400">
            {data.data.listner.prompt}
        </p>
    </div>
    {data.data.posts.length > 0 ? (
        <></>
    ) : commentTrigger ?  (
        <PostButton id={id} />
    ) : (
        <></>
    )}
  </div> 
  )
}

export default ThenNode