'use client'
import React, { useMemo } from 'react'
import { Button } from '../../ui/button'
import Loader from '../loader'
import { Star } from 'lucide-react'
import { useCreateAutomation } from '@/Hook/use-automation'
import { v4 } from 'uuid'

type Props = {}

const CreateAutomation = (props: Props) => {
    const mutationId = useMemo(()=> v4() , [])
    //WIP : Create the automation in the database using mutate
    
    console.log(mutationId)
    const { isPending , mutate} = useCreateAutomation(mutationId)

  return <Button 
    onClick={() => 
        mutate({ 
            name: 'Untitled',
            id: mutationId,
            createdAt: new Date(),
            keywords: []
        })}
    className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white
    rounded-full from-[#3352CC] font-medium to-[#1C2D70]'>
        <Loader state={isPending}>
            {/* TODO: ICONS HERE */}
            {/* <AutomationDuoToneWhite/> Icon */}
            <Star/>
            <p>Create an Automation</p>
        </Loader>
    </Button>
}

export default CreateAutomation