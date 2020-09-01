export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Environment {
  production: boolean
  apiKey: string
  fbDbUrl: string
}

export interface dbUser {
  login: string
  fio: string
  birthday?: number
  id?: string
  role?: string
  password?: string
}
