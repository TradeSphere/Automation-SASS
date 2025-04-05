import { useListner } from '@/Hook/use-automation'
import React from 'react'
import TriggerButton from '../trigger-button'
import { AUTOMATIONLISTNER } from '@/constant/automation'
import { SubscriptionPlane } from '../../subscriptionPlane'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'


type Props = {
    id: string
}

const ThenAction = ({ id }: Props) => {
  const {
    onSetListner,
    listner: Listner,
    onFormSubmit,
    register,
    isPending,
  } = useListner(id)
  return <TriggerButton label="Then">
    <div className='flex flex-col gap-y-2'>
      {AUTOMATIONLISTNER.map((listner) => (
        listner.type === 'SMARTAI' ? (
          <SubscriptionPlane 
            key={listner.type} 
            type="PRO"
          >
            <div
              onClick={() => onSetListner(listner.type)}
              key={listner.id}
              className={cn(
                Listner === listner.type 
                  ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                  : 'bg-[#464646]',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer border-none hover:opacity-80 transition duration-100',
              )}
            >
              <div className='flex gap-x-2 items-center'>
                {listner.icon}
                <p>{listner.label}</p>
              </div>
              <p>{listner.description}</p>
            </div>
          </SubscriptionPlane>
        ):(
          <div
              onClick={() => onSetListner(listner.type)}
              key={listner.id}
              className={cn(
                Listner === listner.type 
                  ? 'bg-gradient-to-br from-[#3352CC] to-[#1C2D70]'
                  : 'bg-[#171717]',
                  'p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer border-none hover:opacity-80 transition duration-100',
              )}
            >
              <div className='flex gap-x-2 items-center'>
                {listner.icon}
                <p>{listner.label}</p>
              </div>
              <p>{listner.description}</p>
            </div>
        )
      ))}
      <form 
        onSubmit={onFormSubmit}
        className="gap-y-3 flex flex-col"
      >
        <Textarea
          placeholder={
            Listner === 'SMARTAI'
              ? 'Add a prompt that your smart ai can use...'
              : 'Add a message you want to send to your customers'  
          }
          {...register('prompt')}
          className='bg-[#171717] outline-none border-none ring-0 rounded-[8px] py-2 focus:ring-0'
        />
        <Input
          {...register('reply')}
          placeholder='Add an reply for comments (Optional)'
          className='bg-[#171717] outline-none border-none rounded-[5px] ring-0 focus:border-2 focus:border-white'
        />
        <Button className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
          <Loader state={isPending}>Add Listener</Loader>
        </Button>
      </form>
    </div>
  </TriggerButton>
}

export default ThenAction