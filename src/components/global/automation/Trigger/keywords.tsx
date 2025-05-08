import { Input } from '@/components/ui/input'
import { useKeywords } from '@/Hook/use-automation'
import { useMutationDataState } from '@/Hook/use-mutation'
import { useQueryAutomation } from '@/Hook/user-queries'
import { X } from 'lucide-react'
import React from 'react'

type Props = {
    id: string
}

const Keywords = ({id}: Props) => {
  const { onValueChange , keyword , onKeyPress , deleteMutation} = useKeywords(id)
  const { latestVariable } = useMutationDataState(['add-keyword'])
  const  { data } = useQueryAutomation(id)  

  return (
    <div className='bg-slate-900 flex flex-col gap-y-3 p-3 rounded-xl'>
        <p className='text-sm text-slate-200'>
            Add words that trigger automations 
        </p>
        <div className='flex flex-wrap justify-start gap-2 items-center'>
            {data?.data?.keywords &&  
                data?.data?.keywords.length > 0 && 
                data?.data?.keywords.map(
                    (word) => word.id !== latestVariable?.variables.id && 
                        <div key={word.id} className='bg-slate-800 text-slate-200 rounded-full px-3 py-1 
                        flex items-center capitalize gap-x-2'
                        >
                            <p>{word.word}</p>
                            <X
                                size={20}
                                onClick={()=> deleteMutation({ id: word.id })}
                            />    
                        </div>
            )}
            {latestVariable && latestVariable?.status === 'pending' && (
                <div className='bg-slate-800 text-slate-200 rounded-full flex items-center capitalize px-3 py-1'>
                    {latestVariable?.variables.keyword}
                </div>
            )} 

            <Input
                placeholder='Add keywords'
                // style={{ width: Math.min(Math.max(keyword.length || 10,2), 50) + 'ch'}}
                value={keyword}
                className='p-0 bg-transparent ring-0 border-none outline-none'
                onChange={onValueChange}
                onKeyUp={onKeyPress}
            />
        </div>
    </div>
  )
}

export default Keywords