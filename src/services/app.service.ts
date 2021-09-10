import { Injectable } from '@nestjs/common';
import { Recipe, RecipeDTO, RecipeRaw } from '../models/Recipe';
import { Knex } from 'knex';
import { Ingredient, IngredientDTO } from 'src/models/Ingredient';

const knex: Knex = require('knex')({
  client: 'postgresql',
  connection: {
      port: 5432,
      host: 'localhost',
      database: 'Rebbanco',
      user: 'rebequinha',
      password: 'totitaus'
    }
  })

@Injectable()
export class AppService {

  async getHello(): Promise<string> {
    let user = await knex.table('Recipe').select('*')
    return 'Hello World!';
  }

  async getAllRecipes(): Promise<Recipe[]> {
    //knex.select('*').from('users').leftJoin('accounts', 'users.id', 'accounts.user_id')
    let recipeRaw = await knex<RecipeRaw>('Recipe').select('*')
    let promices = recipeRaw.map(this.createRecipeFromRawRecipe)
    let recipes: Recipe[] = await Promise.all(promices) 

    return recipes
  }

  private async createRecipeFromRawRecipe(recipe: RecipeRaw, index: number): Promise<Recipe> {
    let ingredients = await knex<Ingredient>('Ingredient').where('recipe_id', recipe.id)
    return {
      ...recipe,
      ingredients: ingredients
    }
  }

  async createRecipe(recipe: RecipeDTO) {
    let addedRecipe = await this.addRecipeToDatabase(recipe)
    let ingredientDTOs: IngredientDTO[] = recipe.ingredients.map( data => {
      return {
        name: data.name,
        quantity: data.quantity,
        recipe_id: addedRecipe.id
      }
    })
    Promise.all(ingredientDTOs.map(this.addIngredientToDatabase))
    return true
  }

  private async addIngredientToDatabase(ingredient: IngredientDTO): Promise<Ingredient> {
    let addedIngredient: Ingredient[] = await knex('Ingredient')
    .insert(ingredient)
    .returning('*')

    return addedIngredient[0]
  }

  private async addRecipeToDatabase(recipe: RecipeDTO): Promise<Recipe> {
    let addedRecipe: Recipe[] = await knex('Recipe')
    .insert({
      title: recipe.title,
      preparation_method: recipe.preparation_method,
      preparation_time: recipe.preparation_time,
      portions: recipe.portions
    })
    .returning('*')

    return addedRecipe[0]
  }
}
