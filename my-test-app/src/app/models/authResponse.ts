export class AuthResponse{
    accessToken : string
    expiresIn: number

    constructor(obj?:AuthResponse){
      this.accessToken = obj?.accessToken ?? ''
      this.expiresIn = obj?.expiresIn ?? 0
    }
    
}