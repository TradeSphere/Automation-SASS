import { v4 } from "uuid"

type Props = {
    id: string
    label: string
    subLabel: string
    description: string
}

export const DASHBOARD_CARDS: Props[] = [
    {
        id: v4(),
        label: 'Set-up Auto Replies',
        subLabel: 'Deliver a product lineup through Instagram DM',
        description: 'Get products in front of your followers in as many places'
    },
    {
        id: v4(),
        label: 'Create a Product Catalog',
        subLabel: 'Showcase your products in a beautiful catalog',
        description: 'Get products in front of your followers in as many places'
    },
    {
        id: v4(),
        label: 'Create a Product Catalog',
        subLabel: 'Showcase your products in a beautiful catalog',
        description: 'Get products in front of your followers in as many places'
    }
]