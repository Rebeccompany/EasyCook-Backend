import { Schema } from "mongoose";

import mongoose from 'mongoose';

export const recipeSchema = new Schema({
    title: String,
    preparation_method: String,
    preparation_time: Number,
    portions: Number,
    ingredients: [{
        name: String,
        quantity: Number
    }]
})

export const recipeModel = async () => {
    await mongoose.connect("mongodb+srv://dbUser:BoDuOzD6Uo708ImX@cluster0.8r3by.mongodb.net/test?retryWrites=true&w=majority");
    return mongoose.model("Recipe", recipeSchema)
}