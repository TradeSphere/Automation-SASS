import { client } from "@/lib/prisma"
import axios from "axios"

export const matchKeyword = async (keyword: string) => {
    return await client.keyword.findFirst({
        where: {
            word: {
                equals: keyword,
                mode: 'insensitive'
            }
        }
    })
}

export const getKeywordAutomation = async (
    automationId: string,
    dm: boolean
) => {
    return await client.automation.findUnique({
        where: {
            id: automationId
        },

        include: {
            dms: true,
            trigger: {
                where: {
                    type: dm ? 'DM' : 'COMMENT'
                }
            },
            listner: true,
            User: {
                select: {
                    subscription: {
                        // select: {
                        //     plan: {}
                        // }
                        // select: {
                        //     //plan not included in here have to do when we built payment system
                        //     // plan: true,
                        // }
                    },
                    integrations: {
                        select: {
                            token: true,
                        }
                    }
                }
            }
        }
    })
}



export const createChatHistory = (
    automationId: string,
    sender: string,
    reciever: string,
    message: string,
) => {
    return client.automation.update({
        where: {
            id: automationId
        },
        data: {
            dms: {
                create: {
                    reciever,
                    senderId: sender,
                    message
                }
            }
        }
    })
}


export const sendDM = async (
    userId: string,
    recieverId: string,
    prompt: string,
    token: string
) => {
    console.log('sending message')
    return await axios.post(
        `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
        {
            recipient: {
                id: recieverId
            },
            message: {
                text: prompt
            }
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

export const getKeywordPost = async (postId: string, automationId: string) => {
    return await client.post.findFirst({
        where: {
            AND: [{postid: postId}, {automationId}]
        },
        select: {automationId: true}
    })
}