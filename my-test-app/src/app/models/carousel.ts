export class carousel {
  title: string;
  description: string;
  imgPath: string;
  imgAltText: string;

  constructor(obj?: carousel) {
    this.title = obj?.title ?? '';
    this.description = obj?.description ?? '';
    this.imgPath = obj?.imgPath ?? '';
    this.imgAltText = obj?.imgAltText ?? '';
  }

}