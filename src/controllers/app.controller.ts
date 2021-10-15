import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Recipe } from '../models/Recipe'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('recipes')
  async getAllRecipes(): Promise<Recipe[]> {
    return await this.appService.getAllRecipes();
  }

  @Post('addRecipe')
  async addAnRecipe(@Body() recipe: any) {
    this.appService.createRecipe(recipe)
  }
}
