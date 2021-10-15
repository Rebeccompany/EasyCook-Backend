interface Ingredient {
    name: string
    quantity: number
}

export class Recipe {
    constructor(
        public title: string, 
        public preparation_method: string, 
        public preparation_time: number, 
        public portions: number, 
        public _id: number,
        public ingredients: Ingredient[]
    ) {}
}