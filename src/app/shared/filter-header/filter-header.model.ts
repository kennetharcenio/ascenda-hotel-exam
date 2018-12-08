export class FilterHeader{

    constructor(
        public name?: string,
        public minReviewRating?:number,
        public maxReviewRating?:number,
        public minPrice?: number,    
        public maxPrice?: number,
        public starRating?: Array<number>,
        ){
            this.starRating= new Array<number>();
        }

}