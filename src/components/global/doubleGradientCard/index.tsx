import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

type Props = {
    label: string
    subLabel: string
    description: string
}

const DoubleGradientCard = ( { description , label , subLabel}: Props) => {
  return (
    <div className='relative border-[1px] border-[#545454] rounded-xl p-5 flex flex-col gap-y-20 overflow-hidden'>
        <div className='flex flex-col z-40'>
            <h2 className='text-2xl font-medium'>{label}</h2>
            <p className='text-slate-400'>{subLabel}</p>
        </div>
        <div className='flex justify-between items-center z-40 gap-x-10'>
            <p className='text-slate-400 text-sm'>{description}</p>
            <Button className='rounded-full bg-light-blue w-10 h-10'>
                <ArrowRight color='white'/>
            </Button>
        </div>
        <div className="w-1/2 h-full absolute top-0 left-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>        {/* <div className='w-6/12 h-full absolute bg-gradient-to-r from-slate-50 to-indigo-400 top-0 left-0 z-10'></div> */}
        {/* <div className='w-6/12 h-full absolute bg-gradient-to-r from-slate-50 to-indigo-400 top-0 left-0 z-10 '></div> */}
    </div>
  )
}

export default DoubleGradientCard
