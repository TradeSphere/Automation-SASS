'use client'
import { useQueryAutomations } from '@/Hook/user-queries'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {}

const MetricsCard = (props: Props) => {
  const {data} = useQueryAutomations()
  const comments = data?.data.reduce((current , next) => {
    return current + next.listner?.commentCount!
  }, 0)
  
  const dms = data?.data.reduce((current , next) => {
    return current + next.listner?.dmCount!
  },0)

  return (
    <div className='h-full flex lg:flex-row flex-col gap-5 items-end'>

        {[1,2].map((i)=> (
            <div
                key={i}
                className='p-5 border-[1px] flex flex-col gap-y-20 rounded-xl lg:w-6/12'
            >
                {i === 1 ? (
                    <div>
                        <h2 className='text-3xl text-white font-bold'>Comments</h2>
                        <p className='text-sm text-slate-400'>On your posts</p>
                    </div>
                ) : (
                    <div>
                        <h2 className='text-3xl text-white font-bold'>Direct Messages</h2>
                        <p className='text-sm text-slate-400'>On your account</p>
                    </div>
                )}
                { i === 1 ? (
                    <div>
                        <h3 className='text-3xl font-bold'>100</h3>
                        <p className="text-sm">
                            {comments} out of {comments} comments replied
                        </p>
                    </div>
                ) : (
                    <div>
                        <h3 className='text-3xl font-bold'>100</h3>
                        <p className="text-sm">
                            {dms} out of {dms} comments replied
                        </p>
                    </div>
                )}
            </div>
        ))}
    </div>
  )
}

export default MetricsCard