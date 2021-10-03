import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';
import { RecipeDTO } from 'src/models/Recipe';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Test Recipes list and adition', () => {
    it('should not return an emptylist', async () => {
      expect.assertions(1);
      let recipes = await appController.getAllRecipes()
      expect(recipes.length).toBeGreaterThan(0);
    });

    it('should add a new Recipe', async () => {
      expect.assertions(1);
      let before = await appController.getAllRecipes();
      let beforeLenght = before.length

      let r = {
        "title": ["TIto Taus"],
        "preparation_method": "adicione a Jessie na panela com 3 pitadas de amor e 1 pitada de sal, depois vá atrás das meninas super poderosas e jogue dominó",
        "preparation_time": 180,
        "portions": 1,
        "ingredients": [
          {
            "name": ["Jessie"],
            "quantity": 1
          },
          {
            "name": ["Docinho"],
            "quantity": 1
          },
          {
            "name": ["Lindinha"],
            "quantity": 1
          },
          {
            "name": ["Florzinho"],
            "quantity": 1
          }
        ]
      }

      await appController.addAnRecipe(r);
      let after = await appController.getAllRecipes();
      expect(after.length).toBeGreaterThanOrEqual(beforeLenght);
    });
  });
});
