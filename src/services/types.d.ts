export interface User {
    username: string,
    email: string
}

export interface UserWithToken extends User {
    token: string
}