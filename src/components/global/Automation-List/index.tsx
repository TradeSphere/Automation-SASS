"use client"
import { usePaths } from '@/Hook/usePathHook'
import { cn, getMonth } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import GradientButton from '../gradient-button'
import { Button } from '@/components/ui/button'
import { useQueryAutomations } from '@/Hook/user-queries'
import CreateAutomation from '../CreateAutomation'

type Props = {}

const AutomationList = (props: Props) => {
  const { data } = useQueryAutomations()

  const {pathname} = usePaths()
  
  if(data?.status !== 200 || data?.data.length <= 0){
    return (
        <div className='h-[70vh] flex justify-center items-center flex-col gap-y-3'>
            <h3 className='text-lg text-gray-400'>No Automation</h3>
            <CreateAutomation/>
        </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-3'>
        {data.data!.map((automation)=>(
            <Link 
            href={`${pathname}/${automation.id}`}
            key={automation.id}
            className='bg-[#1D1D1D] hover:opacity-80 transition duration-100
            rounded-xl p-5 border-[1px] radial--gradient--automations flex border-[#545454]'
            >
                <div className='flex flex-col flex-1 items-start'>
                    <h2 className='text-xl font-semibold'>
                        {automation.name}
                    </h2>
                    <p className='text-[#9B9CA0] text-sm font-light mb-2'>
                        This is from the comment
                    </p>
                    
                    {automation.keywords.length>0 ? (
                        <div className='flex gap-x-2 flex-wrap mt-3'>
                            <div className={cn('rounded-full px-4 py-1 capitalize',
                                (0 + 1) % 1 == 0 &&
                                    'bg-gray-800 border-green-500 border-2',
                                (1 + 1) % 2 == 0 && 
                                    'bg-gray-800 border-2 border-purple-500',
                                (2 + 1) % 2 == 0 &&
                                    'bg-gray-800 border-2 border-yellow-500',
                                (3 + 1) % 2 == 0 &&  
                                    'bg-gray-800 border-2 border-orange-500',
                            )}>
                                getStarted
                            </div>
                        </div>                    
                    ):(
                        <div className='rounded-full border-2 mt-3 border-dashed border-white/60 px-3 py-1'>
                            <p className='text-sm text-[#bfc0c3]'>
                                No keywords
                            </p>
                        </div>
                    )}
                </div>
                <div className='flex flex-col justify-between'>
                    <p className='capitalize text-sm font-light text-[#9B9CA0]'>
                    {getMonth(automation.createdAt.getUTCMonth() + 1)}{' '}
                    {automation.createdAt.getUTCDate() === 1 
                        ? `${automation.createdAt.getUTCDate()}st`
                        : `${automation.createdAt.getUTCDate()}th`
                    }{' '}
                    {automation.createdAt.getUTCFullYear()}
                    </p>

                        {/* WIP: render the butto based on the listner  */}
                    {automation.listner?.listener === 'SMARTAI' 
                        ? (
                            <GradientButton
                                type='BUTTON'
                                className='w-full bg-gray-800 text-white
                                hover:bg-gray-800'
                            >
                                Smart AI
                            </GradientButton>

                        ):(
                            <Button className='bg-gray-800 hover:bg-gray-800 text-while mt-5'>
                                Standard
                            </Button>
                        )
                    }
                </div>
            </Link>
        ))}
    </div>
  )
}

export default AutomationList