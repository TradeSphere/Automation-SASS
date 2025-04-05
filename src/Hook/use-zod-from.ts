import { UseMutateFunction } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodSchema } from 'zod'

const useZodForm = (
    Schema: ZodSchema,
    mutation: UseMutateFunction,
    defaultValues?: any
) => {
    const { 
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset,
    } = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            ...defaultValues
        }
    })


    const onFormSubmit = handleSubmit( async(values) => mutation({...values}))
    return {
        register,
        errors,
        onFormSubmit,
        watch,
        reset,
    }
}

export default useZodForm