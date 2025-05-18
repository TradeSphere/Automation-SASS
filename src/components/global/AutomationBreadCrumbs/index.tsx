'use client'
import { ChevronRight, Pencil } from 'lucide-react'
import React from 'react'
import ActivateAutomationButton from '../active-automation-button'
import { useQueryAutomation } from '@/Hook/user-queries'
import { useEditAutomation } from '@/Hook/use-automation'
import { useMutationDataState } from '@/Hook/use-mutation'
import { Input } from '@/components/ui/input'

type Props = {
  id: string
}

const AutomationBreadCrumbs = ({id}: Props) => {
  //Comment : get the automation data
  const { data } = useQueryAutomation(id) 
  const {edit , enableEdit , inputRef , isPending} = useEditAutomation(id)  
  
  const { latestVariable } = useMutationDataState(['update-automation'])
  
  // User mutation stuff to update the automation 
  return (
    <div className="rounded-full w-full p-5 bg-[#18181BA] flex justify-between items-center">
        <div className="flex items-center gap-x-3 min-w-0">
            <p className="text-[#9B9CA0] truncate">Automations</p>
            <ChevronRight className="flex-shrink-0" color="#9B9CA0"/>
            <span className="flex gap-x-3 items-center min-w-0">
              {/* show the editing data */}
              {edit ? (
                <Input 
                  ref={inputRef}
                  placeholder={
                    isPending ? latestVariable.variables : 'Add a new name'
                  }
                  className="bg-transparent h-auto outline-none text-base border-none"
                />
              )
              : (
                <p className="text-[#9B9CA0]">
                  {latestVariable?.variables
                    ? latestVariable?.variables.name 
                    : data?.data?.name
                  }
                </p>
              )}
              {edit ? (
                <></>
              ) : (
              <span 
                className="cursor-pointer hover:opacity-75 duration-100 
                transition flex-shrink-0 mr-4"
                onClick={enableEdit}
              >
                  <Pencil size={14}/>
                </span>
              )}
            </span>
        </div>
        <div className='flex gap-x-5 ml-auto'>
          <p className='hidden md:block text-gray-400 text-sm truncate min-w-0'>
            All posts are automatically saved
          </p>
          <div className='flex gap-x-5 flex-shrink-0'> 
            <p className='text-gray-400 text-sm truncate min-w-0'>
              Changes Saved
            </p>
            
          </div>
        </div>
        <ActivateAutomationButton id={id} />
    </div>
  )
}

export default AutomationBreadCrumbs