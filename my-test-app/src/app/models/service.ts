export class Service {
    _id : number
    title : string
    description : string
    dateAdded : string
    lastModified : string
    user : string

    constructor(obj?:Service) {
        this._id = obj?._id ?? 0
        this.title = obj?.title ?? ''
        this.description = obj?.description ?? ''
        this.dateAdded = obj?.dateAdded ?? '';
        this.lastModified = obj?.lastModified ?? ''
        this.user = obj?.user ?? ''
    }
}