import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { Accessibility } from 'lucide-react'

type Props = {}

const ActivateAutomationButton = (props: Props) => {
  //WIP: Setup optimistic ui
  //WIP: Getch some automation data
  
  return ( 
    <Button className='lg:px-10 bg-gradient-to-br 
    hover:opacity-80 text-white rounded-full from-[#3352CC]
    font-medium to-[#1C2D70] ml-4'>
        {/* //WIP : set the loadin State */}
     <Loader state={false}>
        <Accessibility/>
        <p className='lg:inline hidden'>
            Activate
            {/* {data?.data?.active ? 'Disable' : ' Activate'} */}
        </p>
     </Loader>
    </Button>
  )
} 

export default ActivateAutomationButton