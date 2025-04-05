import { AudioLinesIcon, Instagram, Smartphone } from "lucide-react"
import { v4 } from "uuid"

export type AutomationListnerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'SMARTAI' | 'MESSAGE'
}

export type AutomationTriggerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'COMMENT' | 'DM'
}

export const AUTOMATIONLISTNER: AutomationListnerProps[] = [
    {
        id: v4(),
        label: 'Send the user a message',
        // add prefalbe icon
        icon: <AudioLinesIcon/>,
        description: 'Enter the message you want to send to the user',
        type: 'MESSAGE',
    },
    {
        id: v4(),
        label: 'Let smart AI take over',
        //add icon
        icon: <Smartphone/>,
        description: 'Tell Ai about you project. ( Upgrade to use this feature',
        type:'SMARTAI',
    },
]



export const AUTOMATIONTRIGGER: AutomationTriggerProps[] = [
    {
        id: v4(),
        label: 'User comments on my post',
        // add prefalbe icon
        icon: <Instagram/>,
        description: 'Select if you want to automate comments on your post',
        type: 'COMMENT',
    },
    {
        id: v4(),
        label: 'Send me a dm with a keywors',
        //add icon
        icon: <Instagram/>,
        description: 'Select if you want to automate DMs on your profile',
        type:'DM',
    },
]