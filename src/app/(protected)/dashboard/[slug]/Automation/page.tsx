import AutomationList from '@/components/global/Automation-List'
import CreateAutomation from '@/components/global/CreateAutomation'
import { Check } from 'lucide-react'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  //WIp : connet with real automation list

  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-5'>
      <div className='lg:col-span-4'>
        <AutomationList/>
      </div>
      <div className='lg:col-span-2'>
        <div className='flex flex-col rounded-xl bg-gray-800 gap-y-6
        p-5 border-[1px] overflow-hidden border-gray-500'
        >
          <div>
            <h2 className='text-xl'>Automations</h2>
            <p className="text-gray-400">
              Your live automation will show here
            </p>
          </div>
          <div className='flex flex-col gap-y-3'>
            {[1,2,3].map((item)=>(
              <div 
                key={item}
                className='flex items-start justify-between'
              >
                <div className='flex flex-col'>
                  <h3 className='font-medium'>
                    Direct traffic toward website
                  </h3>
                  <p className='text-gray-400 text-sm'>
                    October 5th 2024
                  </p>
                </div>
                <Check/>
              </div>  
            ))}
          </div>
          <CreateAutomation/>
        </div>
      </div>
    </div>
  )
}

export default Page