'use client'
import { useQueryAutomation } from '@/Hook/user-queries'
import React from 'react'
import ActiveTrigger from './active'
import { Separator } from '@radix-ui/react-separator'
import ThenAction from '../then/then-action'
import TriggerButton from '../trigger-button'
import { AUTOMATIONTRIGGER } from '@/constant/automation'
import { useTrigger } from '@/Hook/use-automation'
import { cn } from '@/lib/utils'
import Keywords from './keywords'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
    id: string
}

const Trigger = ({id}: Props) => {
  const { types, onSetTrigger , onSaveTrigger , isPending} = useTrigger(id)
  const { data } = useQueryAutomation(id) 
  
  if (data?.data && data?.data?.trigger.length > 0){
    return (
      <div className='flex flex-col gap-y-6 items-center'>
        {/* WIP: add this for the type data.data.trigger.length */}
        <ActiveTrigger
          type={data.data.trigger[0].type}
          // keywords={data.data.keywords.filter(keyword => keyword.automationId !== null) as { id: string; word: string; automationId: string }[]}
          keywords={data.data.keywords}
        />
        {/* WIP: add this for the type data.data.trigger.length */}
        {data?.data?.trigger.length > 1 && (
          <>
            <div className='relative w-6/12'>
              <p className='absolute transform px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2'>
                or
              </p>
              <Separator 
                orientation='horizontal'
                // className='border-muted-foreground border-[1px]'
              />
            </div>
            <ActiveTrigger
              type={data.data.trigger[0].type}
              keywords={data.data.keywords}
            />
          </>
        )}
          
        {!data.data.listner && <ThenAction id={id} /> } 
      </div>
    )
  }
    return <TriggerButton label='Add Trigger'>
      <div className='flex flex-col gap-y-2'>
        {AUTOMATIONTRIGGER.map((trigger)=> (
          <div
            key={trigger.id}
            onClick={()=> onSetTrigger(trigger.type)}
            className={cn(
              'hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2',
              !types?.find((t) => t === trigger.type)
                ? 'bg-gray-950'
                : 'bg-blue-650',
                // : 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70] font-medium'
            )}  
          >
            <div className='flex gap-x-2 items-center'>
              {trigger.icon}
              <p className='text-sm font-light'>{trigger.description}</p>
            </div>
          </div>
        ))}
        <Keywords id={id}/>
        <Button
          onClick={onSaveTrigger}
          disabled={types?.length === 0}
          className='bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white font-medium rounded-xl p-3'
        >
          <Loader state={isPending}>Create Trigger</Loader>          
        </Button>
      </div>
    </TriggerButton>
  }

export default Trigger