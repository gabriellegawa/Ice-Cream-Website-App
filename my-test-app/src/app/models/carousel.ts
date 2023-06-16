import { Image } from "./image";

export class carousel{
    title: string;
    description: string;
    image: Image;

    constructor(obj?:carousel){
      this.title = obj?.title ?? '';
      this.description = obj?.description ?? '';
      this.image = obj?.image ?? new Image();

      //Temporary solution
      this.image.imagePath = 'backend/images/' + this.image.imagePath
    }
    
}