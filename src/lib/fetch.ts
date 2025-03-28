import axios from 'axios'

export const refreshToken = async (token: string) => {
    const refresh_Token = await axios.get(
        `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    )

    return refresh_Token.data
}