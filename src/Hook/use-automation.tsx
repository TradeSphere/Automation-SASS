import { useMutation } from "@tanstack/react-query"
import { useMutationData } from "./use-mutation"
import { createAutomations, saveListner, updateAutomationName } from "@/action/automation"
import { useEffect, useRef, useState } from "react"
import { z } from 'zod'
import useZodForm from "./use-zod-from"

export const useCreateAutomation = (id?: string) => {
    const { isPending , mutate } = useMutationData(
        ['create-automation'],
        () => createAutomations(id),
        "user-automations"
    )

    return { isPending , mutate } 
}

export const useEditAutomation = (automationId: string) => {
    const [edit , setEdit] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const enableEdit = () => setEdit(true)
    const disableEdit = () => setEdit(false)

    const { isPending, mutate } = useMutationData(
        ['update-automation'],
        (data:{name:string})=> 
            updateAutomationName(automationId , { name: data.name}),
        'automation-info',
        disableEdit
    )

    
    useEffect(()=>{
        function handleClickOutside(this: Document, event: MouseEvent){
            if(inputRef.current && !inputRef.current.contains(event.target as Node | null)){
                if(inputRef.current.value !== ""){
                    mutate({ name: inputRef.current.value})
                } else {
                    disableEdit()
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside) 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }    
    }, [])

    return {
        edit,
        enableEdit,
        disableEdit,
        inputRef,
        isPending
    }
}

export const useListner = (id: string) => {
    const [ listner , setListner ] = useState<'MESSAGE' | 'SMARTAI' | null>(null)
    const promptSchema = z.object({
        prompt: z.string().min(1),
        reply: z.string(),
    })

    const { isPending, mutate } = useMutationData(
        ['create-Lister'],
        (data: { prompt: string; reply: string }) => 
            saveListner(id , listner || "MESSAGE", data.prompt , data.reply),
        'automation-info'
    )

    const { errors, onFormSubmit , register, reset , watch} = useZodForm(
        promptSchema,
        mutate
    )

    const onSetListner = (type: 'SMARTAI' | 'MESSAGE') => setListner(type)
    return { onSetListner , register , onFormSubmit , listner , isPending}
}

