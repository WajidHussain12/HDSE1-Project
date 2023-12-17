using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Dynamic;

namespace iceCreamWenApi.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRecipeAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRecipeAPIController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }


        //[HttpGet]
        //public async Task<ActionResult<List<Recipe>>> GetVarieties()
        //{
        //    var recipesWithVarieties = _dbContext.recipes.Include(r => r.Varieties).ToList();
        //    return recipesWithVarieties;
        //}



        [HttpGet]
        public async Task<IActionResult> GetAllRecipesWithFiles()
        {
            try
            {
                var allRecipes = await _dbContext.recipes.ToListAsync();

                if (allRecipes != null && allRecipes.Any())
                {
                    // Create a list to accumulate recipe information
                    List<dynamic> allRecipeInfo = new List<dynamic>();

                    foreach (var recipeData in allRecipes)
                    {
                        // Create a dynamic object to store recipe information
                        dynamic recipeInfo = new ExpandoObject();

                        // Add recipe information to the dynamic object
                        recipeInfo.flavorName = recipeData.flavorName;
                        recipeInfo.recipeid = recipeData.recipeid;

                        recipeInfo.instructions = recipeData.instructions;
                        recipeInfo.ingredients = recipeData.ingredients;
                        recipeInfo.cookingTime = recipeData.cookingTime;
                        recipeInfo.calories = recipeData.calories;
                        recipeInfo.rating = recipeData.rating;
                        recipeInfo.status = recipeData.status;
                        recipeInfo.authorId = recipeData.authorId;
                        recipeInfo.authorName = recipeData.authorName;
                        recipeInfo.recipeImageFileName = recipeData.recipeImageFileName;
                        // Add other properties as needed

                        if (recipeData.fileData != null)
                        {
                            // Create an entry for the recipe file
                            recipeInfo.File = new
                            {
                                FileName = recipeData.recipeImageFileName,
                                FileData = recipeData.fileData // Assuming fileData is a byte array
                            };
                        }


                        //if (recipeData.fileDataBannerImage != null)
                        //{
                        //    // Create an entry for the recipe file
                        //    recipeInfo.fileDataBannerImage = new
                        //    {
                        //        recipeBannerImageFileName = recipeData.recipeBannerImageFileName,
                        //        fileDataBannerImage = recipeData.fileDataBannerImage // Assuming fileData is a byte array
                        //    };
                        //}



                        //if (recipeData.fileDataFlavourImage != null)
                        //{
                        //    // Create an entry for the recipe file
                        //    recipeInfo.fileDataFlavourImage = new
                        //    {
                        //        recipeFlavourImageFileName = recipeData.recipeFlavourImageFileName,
                        //        fileDataFlavourImage = recipeData.fileDataFlavourImage // Assuming fileData is a byte array
                        //    };
                        //}

                        // Add the dynamic object to the list
                        allRecipeInfo.Add(recipeInfo);
                    }

                    // Serialize all recipe information to a JSON string
                    var allRecipeJson = JsonConvert.SerializeObject(allRecipeInfo);

                    return Ok(allRecipeJson);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }




        [HttpGet("{id}")]

        public async Task<ActionResult<List<Recipe>>> GetRecipeByID(int id)
        {

            var userData = await _dbContext.recipes.FindAsync(id);

            if (userData == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(userData);

            }
        }













        //[HttpGet("{recipeId}")]
        //public ActionResult<IEnumerable<Varieties>> GetVarietiesByRecipeId(int recipeId)
        //{
        //    var varietiesForRecipe = _dbContext.varieties.Where(v => v.RecipeID == recipeId).ToList();

        //    if (varietiesForRecipe.Count == 0)
        //    {
        //        return NotFound("No varieties found for the given recipeId.");
        //    }


        //    return varietiesForRecipe;
        //}





        //[HttpGet]

        //public async Task<IActionResult> GetRecipe()
        //{
        //    var recipesWithVarieties = await dbContext.recipes
        //          .Include(recipe => recipe.varieties)
        //              .ThenInclude(variety => variety.recipelist)
        //          .ToListAsync();

        //    return Ok(recipesWithVarieties);
        //}
    }
}
