"use client"
import { PAGE_BREAD_CRUMBS } from '@/constant/pages'
import { usePaths } from '@/Hook/usePathHook'
import { FileQuestion, Menu} from 'lucide-react'
import React from 'react'
import Sheet from '../Sheets'
import Items from '../sidebar/items'
import { Separator } from '@radix-ui/react-separator'
import ClerkAuthState from '../clerk-auth-state'
import { SubscriptionPlane } from '../subscriptionPlane'
import UpgradeCard from '../sidebar/upgradeCard'
import CreateAutomation from '@/components/global/CreateAutomation'
import Search from './Search'
import Notifications from './Notifications'
import MainBreadCrumb from '../MainBreadCrumb'

type Props = {
    slug: string
}

const Navbar = ({slug}: Props) => {
  const { page } = usePaths()
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug 
  
  return currentPage && (
    <div className='flex flex-col'>
      <div className='flex gap-x-3 lg:gap-x-5 justify-end'>
        <span className='lg:hidden flex items-center flex-1 gap-x-2'>
          <Sheet
            trigger={<Menu/>}
            className='lg-hidden'
          >
            <div className='text-[18px] w-full mt-8'>
              <Items page={page} slug={slug}/>
            </div>
            <div className='text-[18px] px-16 w-full mt-8'>
              <Separator
                orientation='horizontal'
                className='bg-[#333336]'
              />
            </div>
            <div className='px-3 flex w-full mt-5 flex-col gap-y-5'>
              <div className='flex gap-x-2'>
                <ClerkAuthState/>
                <p className='text-[#9B9CA0]'>Profile</p>
              </div>
              <div className='flex gap-x-3'>
                {/* <HelpDuoToneWhite/> */}
                <FileQuestion/>
                <p className='text-[#9B9CA0]'>Help</p>
              </div>
            </div>
                    
            <div className='w-50 h-50 bg-green-500'>
                <SubscriptionPlane type="FREE">
                  <div className='flex flex-col gap-y-2'>
                    <UpgradeCard/>
                  </div>
                </SubscriptionPlane>
            </div>        
          </Sheet>
        </span>
        <Search/>
        <CreateAutomation/>
        <Notifications/>
      </div>
      <MainBreadCrumb
        page={page === slug ? 'Home' : page}
        slug={slug}
      />
    </div>
  )
}

export default Navbar