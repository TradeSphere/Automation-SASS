import { getAllAutomations } from "@/action/automation"
import { useQuery } from "@tanstack/react-query"

export const useQueryAutomations = () => {
    return useQuery(
        {
            queryKey:['user-automations'],
            queryFn: getAllAutomations
        }
    )
}