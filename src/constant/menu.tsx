import { Home } from 'lucide-react'
import {v4 as uuid} from 'uuid'

export type FieldProps = {
    label: string
    id: string
}

type SideBarProps = {
    icon: React.ReactNode
} & FieldProps


export const SIDEBARPROPS: SideBarProps[] = [
    {
        id: uuid(),
        label: 'home',
        icon: <Home/>
    },
    {
        id: uuid(),
        label: 'Automation',
        icon: <Home/>
    },
    {
        id: uuid(),
        label: 'Integration',
        icon: <Home/>
    },
    {
        id: uuid(),
        label: 'settings',
        icon: <Home/>
    },
]
