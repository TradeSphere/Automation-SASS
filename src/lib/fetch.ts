import axios from 'axios'
import { client } from './prisma'

export const refreshToken = async (token: string) => {
    const refresh_Token = await axios.get(
        `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    )

    return refresh_Token.data
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

export const trackResponses = async (
    automationId: string,
    type: 'COMMENT' | 'DM',
) => {
    if (type === 'COMMENT') {
        return await client.listener.update({
            where: { automationId },
            data: {
                commentCount: {
                    increment: 1
                }
            }
        })
    }

    if (type === 'DM') {
        return await client.listener.update({
            where: { automationId },
            data: {
                dmCount: {
                    increment: 1
                }
            }
        })
    }
}