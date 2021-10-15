interface Ingredient {
    name: string
    quantity: number
    id: number
    recipe_id: number
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