export class Image {
    _id : number
    shortDescription : string
    imagePath : string
    base64 : string

    constructor(obj?:Image) {
        this._id = obj?._id ?? 0
        this.shortDescription = obj?.shortDescription ?? ''
        this.imagePath = obj?.imagePath ?? ''
        this.base64 = obj?.base64 ?? ''
    }
}