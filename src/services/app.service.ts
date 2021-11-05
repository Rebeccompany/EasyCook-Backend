import { Injectable } from '@nestjs/common';
import { Recipe, RecipeDTO, RecipeRaw } from '../models/Recipe';
import { Knex } from 'knex';
import { Ingredient, IngredientDTO } from 'src/models/Ingredient';
import { recipeModel } from '../models/recipeSchema'

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
    const recipe = await recipeModel()

    recipe.create({title: "string",
      preparation_method: "string",
      preparation_time: 2,
      portions: 2,
      ingredients: [{
          name: "string",
          quantity: 2
      }]})

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

  async createRecipe(recipe: any) {
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

  private async addRecipeToDatabase(recipe: any): Promise<Recipe> {
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

  async login(login: string, password: string): Promise<any> {
    let data = await knex("User")
    .select("*")
    .where('login', login)
    .andWhere('password', password)

    if (data.length == 0) {
      return false
    } else {
      return true
    }
  }
}
