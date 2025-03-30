'use client'
import React from 'react'
import { Button } from '../../ui/button'
import Loader from '../loader'
import { Star } from 'lucide-react'
import { useCreateAutomation } from '@/Hook/use-automation'

type Props = {}

const CreateAutomation = (props: Props) => {
  //WIP : Create the automation in the database using mutate
    
  const { isPending , mutate} = useCreateAutomation()

  return <Button 
    onClick={mutate}
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