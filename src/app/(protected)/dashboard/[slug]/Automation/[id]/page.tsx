import { getAutomationInfo } from '@/action/automation'
import PostNode from '@/components/global/automation/post/node'
import ThenNode from '@/components/global/automation/then/node'
import Trigger from '@/components/global/automation/Trigger'
import AutomationBreadCrumbs from '@/components/global/AutomationBreadCrumbs'
import { PrefetchUserAutomation } from '@/react-query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { LucideFileWarning } from 'lucide-react'
import React from 'react'

type Props = {
    params: {id: string}
}

//Comment: Set some metadata
export async function generateMetadata({ params }:{params: { id: string} }){
  const info = await getAutomationInfo(params.id)
  return {
    title: info.data?.name
  }
}


const Page = async ({params}: Props) => {
  //Info: prefetch user automation data
  const query = new QueryClient() 
  await PrefetchUserAutomation(query , params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationBreadCrumbs id={params.id}/>
        <div className='w-full lg:w-10/12 xl:1-6/12 p-5 rounded-xl flex 
        flex-col bg-[#1D1D1D] gap-y-3'>
          <div className='flex gap-x-2'>
            {/* WIP: Find Warning Logo */}
            <LucideFileWarning/>
            when...
          </div>
          <Trigger id={params.id}/>
        </div>
        <ThenNode id={params.id}/>
        {/* <PostNode  id={params.id} /> */}
      </div>
    </HydrationBoundary>
  )
}

export default Page