import { useQueryUser } from "@/Hook/user-queries"

type Props = {
    type: 'FREE' | 'PRO'
    children: React.ReactNode
}

export const SubscriptionPlane = ({children , type}: Props) => {
    //WIP : return subscription of user
    const { data } = useQueryUser()
    return data?.data?.subscription?.plan === type && children
    // return data?.data?.subscription?.plan === type && children

}