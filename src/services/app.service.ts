import { Injectable } from '@nestjs/common';
import { Recipe } from '../models/Recipe';
import { collections } from "../services/database.service";
import { connectToDatabase } from "../services/database.service"

connectToDatabase();

@Injectable()
export class AppService {

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return (await collections.receitas.find({}).toArray()) as Recipe[]
  }

  async createRecipe(recipe: any) {
    await collections.receitas.insertOne(recipe);
    return true
  }
}
