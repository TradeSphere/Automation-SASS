import { Contact2, Home, HomeIcon, PlugIcon, Settings, Star } from "lucide-react"
import React from "react"


export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'Automation',
    'Integration',
    'settings'
]

type Props = {
    [page in string]: React.ReactNode
}

export const PAGE_ICONS:Props = {
    AUTOMATION: <Star/>,
    CONTACTS: <Contact2/>,
    INTEGRATIONS: <PlugIcon/>,
    SETTINGS: <Settings/>,
    Home: <HomeIcon/>
}