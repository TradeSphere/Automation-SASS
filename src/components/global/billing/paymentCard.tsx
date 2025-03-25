import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    label: string
    current: 'PRO' | 'FREE'
    landing?: boolean
}

const PaymentCard = ({label, current , landing}: Props) => {
  return (
    <div
        className={cn(
            label !== current
                ? 'bg-gray-700'
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
                'p-[5px] rounded-xl overflow-hidden'
            )}  
    >
        <div
            className={cn(
                landing &&  'radial--gradient--pink',
                'flex flex-col rounded-xl pl-5 pr-10 py-5 bg-gray-950' 
            )}
        >
          {landing ? (
            <h2 className='text-2xl'>
                {label === 'PRO' && 'Preminum Plan'}
                {label === 'FREE' && 'Standard'}
            </h2>
          ):(
            <h2 className='text-2xl'>
                {label === current 
                    ? 'Your Current Plan'
                    : current === 'PRO'
                    ? 'Downgrade'
                    : 'Upgrade'
                }
            </h2>
          )}
          <p className='text-[#9B9CA0] text-sm mb-2'>
            This is what your plan covers for automations and Ai features
          </p>
          {label === 'PRO' ? (
            <span className='text-indigo-500 '>
                 Smart AI
            </span>
          ) : (
            <p className='font-bold mt-2 text-[#9B9CA0]'>Standard</p>
          )}
          {label === 'PRO' ? (
            <p className='mb-2'>
                <b className='text-xl'>$99</b>
            </p>
          ):(
            <p className='text-xl mb-2'>Free</p>
          )}

          {[1,2,3,4].map((item) => (
            <div key={item} className='flex items-center gap-x-2'>
                <span className='text-green-500'>✔</span>
                <p className='text-[#9B9CA0]'>Feature {item}</p>
            </div>
          ))}

          {landing ? (
            <Button
                className={cn(
                    'rounded-full mt-5',
                    label === 'PRO'
                     ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                     : 'bg-gray-800 text-white hover:text-gray-800'
                )}
            >
                {label === current 
                    ? 'Get Started'
                    : current === 'PRO'
                    ? 'Free'
                    : 'Get Started'
                }
            </Button>
          ):(
            <Button
                className='rounded-full mt-5 bg-gray-800 text-white hover:text-gray-800'
                disabled={label === current}
            >
                {label === current 
                    ? 'Active'
                    : current === 'PRO'
                    ? 'Downgrade'
                    : 'Upgrade'
                }
            </Button>
          )}
        </div>
    </div>
  )
}

export default PaymentCard