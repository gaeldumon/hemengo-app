export interface ICredential {
    email: string,
    password: string
}

export interface ICredentialPayload {
    id: number,
    email: string,
    iat: number,
    exp: number
}