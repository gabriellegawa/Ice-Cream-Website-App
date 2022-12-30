export class Service {
    _id : number
    title : string
    description : string
    dateAdded : string
    lastModified : string
    user : string

    constructor(obj?:Service) {
        var defaultUser = { 
            firstName:"Budi",
            lastName:"John",
            emailAddress:"budi.john@gmail.com",
            phoneNumber:"12893176983",
            dateOfBirth:"2022-12-06",
            password:"111"
          }

        this._id = obj?._id ?? 0
        this.title = obj?.title ?? ''
        this.description = obj?.description ?? ''
        this.dateAdded = obj?.dateAdded ?? '';
        this.lastModified = obj?.lastModified ?? ''
        this.user = obj?.user ?? defaultUser.firstName
    }
}