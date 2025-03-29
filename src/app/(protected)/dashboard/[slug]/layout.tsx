import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import React from 'react'
import Sidebar from '@/components/global/sidebar'
import Navbar from '@/components/global/Navbar'
import { PrefetchUserAutomations, PrefetchUserProfile } from '@/react-query/prefetch'

type Props = {
    children: React.ReactNode
    params: { slug: string }
}

const Layout = async({children , params}: Props) => {
     // Query 
     // WIP :  Query CLient Fetch Data 

    const query = new QueryClient()

    await PrefetchUserProfile(query)
    await PrefetchUserAutomations(query)

    return (
      <HydrationBoundary state={dehydrate(query)}> 
      {/* //allows to use react-query (caching)  */}
        <div className='p-3'>
          <Sidebar 
          slug ={params.slug} 
          />
          {/* navbar  */}
          <div 
          className='lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'
          >
            <Navbar slug={params.slug} />
            {children}
          </div>
      </div>
      </HydrationBoundary>
  )
}

export default Layout
