'use client'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/Hook/use-subscription'
import React from 'react'
import Loader from '../loader'
import { CreditCardIcon, Loader2 } from 'lucide-react'

type Props = {}

const PaymentButton = (props: Props) => {
  
  const { onSubscribe , isProcessing} = useSubscription()
  
  return ( 
    <Button
      disabled={isProcessing}
      onAbort={onSubscribe}
      className='bg-gradient-to-r text-white font-bold rounded-full from-[#9685DB] via-[#9434E6] to-[#CC38D4]'
    >
      {isProcessing ? <Loader2 className='animate-spin '/> : <CreditCardIcon/>}
      Upgrade
    </Button>
    )
}

export default PaymentButton