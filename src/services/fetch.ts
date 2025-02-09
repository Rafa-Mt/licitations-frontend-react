import { getAuthToken, saveAuthToken } from "./cookies"

export const getUserType = async () => {
    // TODO
    return 'user'
}

export const login = async () => {
    const token = ""
    saveAuthToken(token)
}

export const register = async () => {
    const token = ""
    saveAuthToken(token)
}
