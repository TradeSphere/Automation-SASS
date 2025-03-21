
import React from 'react'
import Sidebar from '@/components/global/sidebar'

type Props = {
    children: React.ReactNode
    params: { slug: string }
}

const Layout = ({children , params}: Props) => {
     // Query 
     // WIP :  Query CLient Fetch Data 
    return (
      <div className='p-3 h-screen'>
        <Sidebar 
         slug ={params.slug} 
        /> 
    </div>
  )
}

export default Layout
