import DoubleGradientCard from '@/components/global/doubleGradientCard'
import { DASHBOARD_CARDS } from '@/constant/dashboard'
import { Building, LucideBuilding } from 'lucide-react'
import React from 'react'
import Chart from './_components/chat'
import MetricsCard from './_components/chat/metricsCard'

type Props = {}

const Page = (props: Props) => {
  return (
    // <div
    //   className="flex flex-col items-center justify-center h-screen bg-gray-100"
    // >

    // </div>
    <div className="flex flex-col gap-y-10">
      <div className="flex gap-5 lg:flex-row flex-col">
        {DASHBOARD_CARDS.map((card)=>(
          <DoubleGradientCard
            key={card.id}
            {...card}
          />
        ))}
      </div>
      <div className='border-[1px] relative border-[#545454] p-5 rounded-xl'>
        <span className='flex gap-x-1 z-50 items-center'>
          {/* <AutomationIcon/> */}
          {/* <Building fill='blue'/> */}
          <div className='z-50'>
            <h2 className='text-2xl font-medium text-white'>
              Automated Activity
            </h2>
            <p className='text-slate-400 text-sm'>
              Automate 0 out of 1 interactions
            </p>
          </div>
        </span>
        <div className='w-full flex lg:flex-row flex-col gap-5'>
          <div className='lg:w-6/12'>
            <Chart />
          </div>
          <div className='lg:w-6/12'>
            <MetricsCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page


