import { AudioLinesIcon, Smartphone } from "lucide-react"
import { v4 } from "uuid"

export type AutomationListnerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'SMARTAI' | 'MESSAGE'
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