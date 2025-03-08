const request = require("supertest");
// const app = require("../server");
const app = require("../index")
const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

describe("Recipe API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create a new recipe", async () => {
    const response = await request(app)
      .post("/recipe/create")
      .send({
        title: "Pasta",
        description: "Delicious Italian pasta",
        ingredients: ["Pasta", "Tomato Sauce"],
        steps: ["Boil pasta", "Add sauce"],
        prepTime: 10,
        cookTime: 15,
        totalTime: 25,
        servings: 2,
        category: "Dinner",
        cuisine: "Italian",
      })
      .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWthc2hqaGFuZGxzQGdtYWlsLmNvbSIsIl9pZCI6IjY3Y2FlMjc4ZTIzMjU5NWU0ZTNmNDE5MSIsImlhdCI6MTc0MTM1OTkxOSwiZXhwIjoxNzQxNDQ2MzE5fQ.hPys-dQnKOXFuWjcSnCyPul2hGq6m2jaZ-q66YoeK-k`);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("recipe");
    expect(response.body.recipe.title).toBe("Pasta");
  });

  test("should return a recipe by ID", async () => {
    const recipe = await Recipe.create({
      title: "Pizza",
      description: "Cheesy and delicious",
      ingredients: ["Dough", "Cheese"],
      steps: ["Bake dough", "Add cheese"],
      prepTime: 15,
      cookTime: 20,
      totalTime: 35,
      servings: 4,
      category: "Lunch",
      cuisine: "Italian",
    });

    const response = await request(app).get(`/recipe/get/${recipe._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Pizza");
  });
});
