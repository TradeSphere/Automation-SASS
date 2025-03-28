"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { findUser } from "./queries"
import { refreshToken } from "@/lib/fetch"
import { updateIntegration } from "../integrations/queries"

export const onCurrentUser = async() => {
    const user = await currentUser()
    if(!user) return redirect('/sign-in')
    
    return user
}

export const onBoardUser = async() => {
 const user = await onCurrentUser()
 try {
    const found = await findUser(user.id)
    if (found) {
        if(found.integrations.length=0){
            const today = new Date()
            const timeLeft = found.integrations[0].expiresAt?.getTime()! - today.getTime()

            const days = Math.round(timeLeft / (1000 * 3600 * 24))
            if(days < 5){
                console.log('refresh')

                const refresh = await refreshToken(
                    found.integrations[0].token
                )

                const today = new Date()
                const expire_Date = today.setDate(today.getDate() + 60)

                const update_Token = await updateIntegration(
                    refresh.access_token,
                    new Date(expire_Date),
                    found.integrations[0].id                   
                )
                
                if (!update_Token){
                    console.log('Update token failed')
                }
              }
            }

            return {
                status: 200,
                data: {
                    firstname: found.firstname,
                    lastname: found.lastname
                }
            }
        } 
        
        const created = await createUser()
    } catch (error) {
    
 }   
}