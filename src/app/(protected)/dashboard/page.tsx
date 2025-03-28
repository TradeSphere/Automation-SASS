import { onBoardUser } from '@/action/user'
import React from 'react'

type Props = {}

const Page = async (props: Props) => {
  //WIP: Server Action Onboard the user
  const user = await onBoardUser()
  //WIP: 200 || 201
  return (
    <div>Page</div>
  )
}

export default Page