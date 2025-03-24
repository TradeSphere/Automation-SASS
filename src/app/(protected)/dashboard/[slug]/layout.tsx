
import React from 'react'
import Sidebar from '@/components/global/sidebar'
import Navbar from '@/components/global/Navbar'

type Props = {
    children: React.ReactNode
    params: { slug: string }
}

const Layout = ({children , params}: Props) => {
     // Query 
     // WIP :  Query CLient Fetch Data 
    return (
      <div className='p-3 h-screen flex'>
        <Sidebar 
         slug ={params.slug} 
        />
        {/* navbar  */}
        <div 
        className='lg:ml-[250px] lg:pl-10 lg:py-5 flex flex-col overflow-auto'
        >
          <Navbar slug={params.slug} />
        </div>
    </div>
  )
}

export default Layout
