import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Guacamole',
  //     'A simple guac recipe',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/3e/Guacamole_IMGP1303.jpg',
  //     [
  //       { name: 'Avocado', amount: 1 },
  //       { name: 'Onion', amount: 2 },
  //     ]
  //   ),
  //   new Recipe(
  //     'Sausage Gravy',
  //     'Delicious on a biscuit',
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYHrcV565oPz9A0jlHz8mzXF9inWMYq5BDQkhfnewjg&s',
  //     [
  //       { name: 'Sausage', amount: 4 },
  //       { name: 'Cream', amount: 1 },
  //     ]
  //   ),
  // ];

  getRecipes() {
    return this.recipes.slice(); //using slice so we are returning a copy of the stored array
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
