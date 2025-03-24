import React from 'react' 
import {
    Sheet as ShadcnSheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'

type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    className?: string
}

const Sheet0 = ({children, trigger , className}: Props) => {
  return (
    <div>
        <Sheet/>
    </div>
  )
}

export default Sheet0