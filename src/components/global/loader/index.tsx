"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type Props = {
    state: boolean
    className?: string
    children: React.ReactNode
    color?: string
}

const Loader = ({children , state , className , color}: Props) => {
    return state ? (
        <div className={cn(className)} >
            <Loader2/>
        </div>
    ) : (
        children
    )
}

export default Loader