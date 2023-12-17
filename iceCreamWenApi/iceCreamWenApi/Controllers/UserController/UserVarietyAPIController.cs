using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Dynamic;

namespace iceCreamWenApi.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserVarietyAPIController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;

        public UserVarietyAPIController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }


    
        [HttpGet("{id}")]

        public async Task<ActionResult<List<Varieties>>> GetAllRecipesWithFiles(int id)
        {
            try
            {
                var allVarieties = _dbContext.varieties.Where(v => v.RecipeID == id).ToList();

                if (allVarieties != null && allVarieties.Any())
                {
                    // Create a list to accumulate recipe information
                    List<dynamic> allVarietiesInfo = new List<dynamic>();

                    foreach (var varietyData in allVarieties)
                    {
                        // Create a dynamic object to store recipe information
                        dynamic varietyInfo = new ExpandoObject();

                        // Add recipe information to the dynamic object
                        varietyInfo.VarietyID = varietyData.VarietyID;
                        varietyInfo.RecipeID = varietyData.RecipeID;
                        varietyInfo.RecipeName = _dbContext.recipes.Where(r => r.recipeid == varietyData.RecipeID).Select(r => r.flavorName).FirstOrDefault();
                        varietyInfo.varietyName = varietyData.varietyName;
                        varietyInfo.deliveryTime = varietyData.deliveryTime;
                        varietyInfo.cashOnDelivery = varietyData.cashOnDelivery;
                        varietyInfo.price = varietyData.price;

                        //varietyInfo.flavorName = varietyData.VarietyImageFileName;

                        //recipeInfo.recipeImageFileName = recipeData.recipeImageFileName;
                        // Add other properties as needed

                        if (varietyData.varietyImg != null)
                        {
                            // Create an entry for the recipe file
                            varietyInfo.File = new
                            {
                                FileName = varietyData.VarietyImageFileName,
                                FileData = varietyData.varietyImg// Assuming fileData is a byte array
                            };
                        }

                        // Add the dynamic object to the list
                        allVarietiesInfo.Add(varietyInfo);
                    }

                    // Serialize all recipe information to a JSON string
                    var allRecipeJson = JsonConvert.SerializeObject(allVarietiesInfo);

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








        //[HttpGet("GetAllVarietiesWithRecipes")]
        //public ActionResult<IEnumerable<object>> GetAllVarietiesWithRecipes()
        //{
        //    var varietiesWithRecipes = _dbContext.varieties
        //        .Select(v => new
        //        {
        //            VarietyID = v.VarietyID,
        //            RecipeID = v.RecipeID,
        //            RecipeName = _dbContext.recipes
        //                .Where(r => r.recipeid == v.RecipeID)
        //                .Select(r => r.flavorName)
        //                .FirstOrDefault(),
        //            VarietyImg = v.varietyImg,
        //            VarietyName = v.varietyName,
        //            DeliveryTime = v.deliveryTime,
        //            CashOnDelivery = v.cashOnDelivery,
        //            Price = v.price
        //        })
        //        .ToList();

        //    if (varietiesWithRecipes.Count == 0)
        //    {
        //        return NotFound("No varieties found.");
        //    }

        //    return varietiesWithRecipes;
        //}






        //[HttpGet("{id}")]

        //public async Task<ActionResult<List<Varieties>>> getVarietyDataById(int id)
        //{
        //    var varietyData = await _dbContext.varieties.FindAsync(id);
        //    if (varietyData == null)
        //    {
        //        return BadRequest();
        //    }

        //    else
        //    {

        //        return Ok(varietyData);
        //    }

        //}







    }
}
