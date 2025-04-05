'use client'
import { usePaths } from '@/Hook/usePathHook'
import React from 'react'
import Items from './items'
import { Separator } from '@/components/ui/separator'
import ClerkAuthState from '../clerk-auth-state'
import { FileQuestion } from 'lucide-react'
import { SubscriptionPlane } from '../subscriptionPlane'
import UpgradeCard from './upgradeCard'

type Props = {
    slug: string
}

const Sidebar = ({slug}: Props) => {
    const { page } = usePaths()
    
    return (
    <div className='w-[250px] h-[99%] rounded-xl hidden bg-red-500 fixed left-0 lg:inline-block border-[#545454] bottom-0 top-0 m-3 overflow-hidden'>
        <div className='flex flex-col w-full items-center p-2'>
            <div className='text-3xl mt-5'>
                 Logo
            </div>
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
        </div>
        <div className='w-50 h-50 bg-green-500'>
            <SubscriptionPlane type="FREE">
                <div className='flex flex-col gap-y-2'>
                    <UpgradeCard/>
                </div>
            </SubscriptionPlane>
        </div>
    </div>
  )
}

export default Sidebar