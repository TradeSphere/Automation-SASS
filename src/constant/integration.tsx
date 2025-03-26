import { Instagram, Salad } from "lucide-react";

type Props = {
    title: string
    description: string
    icon: React.ReactNode
    strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATIONS_CARDS: Props[] = [
    {
        title: 'Connect Instagram',
        description: 'Connect your Instagram account to get started',
        icon: <Instagram/>,
        strategy: 'INSTAGRAM'
    },
    {
        title: 'Connect Saleforce',
        description: 'Connect your Saleforce account to get started',
        icon: <Salad/>,
        strategy: 'CRM'
    }
]