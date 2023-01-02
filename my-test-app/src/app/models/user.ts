export class User{
    _id : number
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: number
    dateOfBirth: string
    password: string
    userType: string

    constructor(obj?:User){
      
      this._id = obj?._id ?? 0
      this.firstName = obj?.firstName ?? ''
      this.lastName = obj?.lastName ?? ''
      this.emailAddress = obj?.emailAddress ?? ''
      this.phoneNumber = obj?.phoneNumber ?? 0
      this.dateOfBirth = obj?.dateOfBirth ?? ''
      this.password = obj?.password ?? ''
      this.userType = obj?.userType ?? ''
    }
    
}