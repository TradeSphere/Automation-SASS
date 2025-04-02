'use client'
import { useQueryAutomation } from '@/Hook/user-queries'
import React from 'react'
import ActiveTrigger from './active'
import { stringify } from 'querystring'
import { Separator } from '@radix-ui/react-separator'

type Props = {
    id: string
}

const Trigger = ({id}: Props) => {
  const { data } = useQueryAutomation(id) 
  
  // if (data?.data && data?.data?.trigger.length > 0){
    return (
      <div className='flex flex-col gap-y-6 items-center'>
        {/* WIP: add this for the type data.data.trigger.length */}
        <ActiveTrigger
          type={"COMMENT"}
          keywords={[{
            id: "akjsdfsadfasdf",
            word: "getStarted",
            automationId: id,
          }]}
        />
        {/* WIP: add this for the type data.data.trigger.length */}
        {/* {data?.data?.trigger.length > 1 && <></>} */}
          
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
            type={'MESSAGE'}
            keywords={[
              {
                id:'ajsdfkasdfad',
                word: 'Meplease',
                automationId: id,
              }
            ]}
          />
        </>
      
      </div>
    )
  }
// }

export default Trigger