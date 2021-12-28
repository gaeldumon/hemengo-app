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

export interface ICredentialComplete {
    id: number,
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string,
    adress: string,
    verified: boolean
}