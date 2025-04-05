import { useListner } from '@/Hook/use-automation'
import React from 'react'
import TriggerButton from '../trigger-button'
import { AUTOMATIONLISTNER } from '@/constant/automation'

type Props = {
    id: string
}

const ThenAction = ({ id }: Props) => {
  const {
    onSetListner,
    listner: Listener,
    onFormSubmit,
    register,
    isPending,
  } = useListner(id)
  return <TriggerButton label="Then">
    <div className='flex flex-col gap-y-2'>
      {AUTOMATIONLISTNER.map((listner) => (
        listner.type === 'SMARTAI' ? (
          <SubscriptionPlan key={listner.type} type=""/>
        ):()
      )}
    </div>
  </TriggerButton>
}

export default ThenAction