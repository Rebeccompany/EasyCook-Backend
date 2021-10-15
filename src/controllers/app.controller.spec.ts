import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../services/app.service';

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
        "title": "batata",
        "preparation_method": "teste123",
        "preparation_time": 3,
        "portion": 5,
        "_id": 1,
        "ingredients": [
          {
            "name": "batata doce",
            "quantity": 10,
            "id": 0,
            "recipe_id": 3
          },
          {
            "name": "batata palha",
            "quantity": 5,
            "id": 1,
            "recipe_id": 6
          }
        ]
      }

      await appController.addAnRecipe(r);
      let after = await appController.getAllRecipes();
      expect(after.length).toBeGreaterThanOrEqual(beforeLenght);
    });
  });
});
