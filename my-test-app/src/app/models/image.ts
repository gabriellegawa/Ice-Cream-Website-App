export class Image {
    _id : number
    shortDescription : string
    imagePath : string

    constructor(obj?:Image) {
        this._id = obj?._id ?? 0
        this.shortDescription = obj?.shortDescription ?? ''
        this.imagePath = obj?.imagePath ?? ''
    }
}