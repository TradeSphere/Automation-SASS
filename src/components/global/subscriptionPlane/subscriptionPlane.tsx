type Props = {
    type: 'FREE' | 'PRO'
    children: React.ReactNode
}

export const SubscriptionPlane = ({children , type}: Props) => {
    //WIP : return subscription of user 
    return (
        <div className='flex flex-col gap-y-2'>
            {children}
        </div>
    )
}