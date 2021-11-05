import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Recipe, RecipeDTO } from '../models/Recipe'

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

  @Post('login')
  async login(@Body() loginData: {login: string, password: string}): Promise<boolean> {
    console.log(loginData)
    return await this.appService.login(loginData.login, loginData.password)
  }
}
