import { Ingredient } from "./Ingredient";

export interface RecipeRaw {
    title: string
    preparation_method: string
    preparation_time: number
    portions: number
    id: number
}

export interface Recipe {
    title: string
    preparation_method: string
    preparation_time: number
    portions: number
    id: number
    ingredients: Ingredient[]
}

export interface RecipeDTO {
    title: string
    preparation_method: string
    preparation_time: number
    portions: number
    ingredients: [{
        name: string
        quantity: number
    }]
}