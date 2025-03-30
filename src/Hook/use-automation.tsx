import { useMutation } from "@tanstack/react-query"
import { useMutationData } from "./use-mutation"
import { createAutomations } from "@/action/automation"

export const useCreateAutomation = () => {
    const { isPending , mutate } = useMutationData(
        ['create-automation'] ,
        () => createAutomations(),
        "user-automations"
    )

    return { isPending , mutate } 
}