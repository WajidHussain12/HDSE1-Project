using iceCreamWenApi.Models;
using iceCreamWenApi.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;
using System.Security.Cryptography.X509Certificates;
using System.Xml;
using Newtonsoft.Json;
using System.Text;
using System.Dynamic;
using Microsoft.AspNetCore.Authorization;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminRecipeAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileService _uploadService;

        public AdminRecipeAPIController(ApplicationDbContext context, IFileService uploadService)
        {
            _context = context;
            _uploadService = uploadService;
        }

        //[HttpGet]
        //public async Task<ActionResult<List<Recipe>>> GetRecipes()
        //{
        //    var recipeData = await _context.recipes.ToListAsync();
        //    return Ok(recipeData);
        //}



        //[HttpGet]
        //public async Task<ActionResult<List<Recipe>>> GetRecipes()
        //{
        //    var recipeData = await _context.recipes.ToListAsync();
        //    var matchedRecipes = new List<Recipe>();
        //    byte[] imageBytes = null;

        //    foreach (var recipe in recipeData)
        //    {
        //        var fileName = recipe.recipeImageFileName;
        //        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "DownloadedImages");
        //        var filePath = Path.Combine(folderPath, fileName);

        //        if (System.IO.File.Exists(filePath))
        //        {
        //            imageBytes = await System.IO.File.ReadAllBytesAsync(filePath);

        //            matchedRecipes.Add(new Recipe
        //            {
        //                //recipeid = recipe.recipeid,
        //                flavorName = recipe.flavorName,
        //            });
        //        }
        //    }

        //    // You need to decide what to return based on your requirements
        //    // For example, you could return both the list of recipes and the image file in a custom object.
        //    var result = new
        //    {
        //        //Recipes = matchedRecipes,
        //        //Image = imageBytes
        //    };

        //    return Ok(new
        //    {
        //        recipes = matchedRecipes,
        //        Image = imageBytes

        //    });
        //}

        public class RecipeManifestItem
        {
            public int RecipeId { get; set; }
            public string FlavorName { get; set; }
            // Add other properties as needed
        }



        //public async Task<ActionResult<List<Recipe>>> GetRecipes()


        [HttpGet]
        public async Task<IActionResult> GetAllRecipesWithFiles()
        {
            try
            {
                var allRecipes = await _context.recipes.ToListAsync();

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

            var recipeData = await _context.recipes.FindAsync(id);

            if (recipeData == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(recipeData);

            }
        }


        //[HttpPost]

        //public async Task<ActionResult<Recipe>> AddRecipe(Recipe Recipe)
        //{


        //    await _context.recipes.AddAsync(Recipe);
        //    await _context.SaveChangesAsync();
        //    return Ok(Recipe);
        //}

        //[Authorize]
        [Consumes("multipart/form-data")]
        [HttpPost]
        public async Task<IActionResult> AddRecipe([FromForm] FileUploadModel model)
        {
            if (model.File.Length > 0)
            {


                var data = new Recipe()
                {
                    flavorName = model.flavorName,
                    cookingTime = model.cookingTime,
                    ingredients = model.ingredients,
                    instructions = model.instructions,
                    calories = model.calories,
                    authorId = model.authorId,
                    authorName = model.authorName,
                    status = model.status,
                    rating = model.rating,



                    recipeImageFileName = model.File.FileName,
                    recipeBannerImageFileName = model.FileRecipeBanner.FileName,
                    recipeFlavourImageFileName = model.FileVarietyBanner.FileName,
                };

                using (var stream1 = new MemoryStream())
                {
                    model.File.CopyTo(stream1);
                    data.fileData = stream1.ToArray();
                }

                using (var stream2 = new MemoryStream())
                {
                    model.FileRecipeBanner.CopyTo(stream2);
                    data.fileDataBannerImage = stream2.ToArray();
                }

                using (var stream3 = new MemoryStream())
                {
                    model.FileVarietyBanner.CopyTo(stream3);
                    data.fileDataFlavourImage = stream3.ToArray();
                }

                await this._context.recipes.AddAsync(data);
                await _context.SaveChangesAsync();

                var recipeId = data.recipeid;
                await Downloading(recipeId);

                return Ok(
                   new
                   {
                       recipeId,
                       success = model.File,
                       flavorName = model.flavorName,
                       cookingTime = model.cookingTime,
                       ingredients = model.ingredients,
                       instructions = model.instructions,
                       calories = model.calories,
                       authorId = model.authorId,
                       authorName = model.authorName,
                       status = model.status,
                       rating = model.rating

                   }
                   );

            }
            return BadRequest("No file or empty file provided");
        }

        private async Task<IActionResult> Downloading(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            else
            {
                await Downloadingbyid(id);
                return Ok(new
                {
                    Message = "File Downloaded Successfully"
                });
            }
        }

        private async Task Downloadingbyid(int id)
        {
            var file = _context.recipes.Where(x => x.recipeid == id).FirstOrDefaultAsync();
            var content = new System.IO.MemoryStream(file.Result.fileData);
            var path = Path.Combine(Directory.GetCurrentDirectory(), "DownloadedImages", file.Result.recipeImageFileName);

            await CopySteam(content, path);

        }

        private async Task CopySteam(Stream stream, String downloadPath)
        {
            using (var fileStream = new FileStream(downloadPath, FileMode.Create, FileAccess.Write))
            {
                await stream.CopyToAsync(fileStream);
            }
        }




        //[HttpPut("{id}")]

        //public async Task<ActionResult<Recipe>> UpdataRecipe(int id, Recipe Recipe)
        //{
        //    if (id != Recipe.recipeid)
        //    {
        //        return BadRequest();

        //    }
        //    else
        //    {
        //        _context.Entry(Recipe).State = EntityState.Modified;
        //        await _context.SaveChangesAsync();
        //        return Ok(Recipe);
        //    }
        //}



        [Consumes("multipart/form-data")]
        [HttpPut("{recipeId}")]
        public async Task<IActionResult> UpdateRecipe(int recipeId, [FromForm] FileUploadModel model)
        {
            var existingRecipe = await this._context.recipes.FindAsync(recipeId);

            if (existingRecipe == null)
            {
                return NotFound("Recipe not found");
            }

            if (model.File.Length > 0)
            {
                // Update the existing recipe properties with new values from the model
                existingRecipe.flavorName = model.flavorName;
                existingRecipe.cookingTime = model.cookingTime;
                existingRecipe.ingredients = model.ingredients;
                existingRecipe.instructions = model.instructions;
                existingRecipe.calories = model.calories;
                existingRecipe.authorId = model.authorId;
                existingRecipe.authorName = model.authorName;
                existingRecipe.status = model.status;
                existingRecipe.rating = model.rating;

                existingRecipe.recipeImageFileName = model.File.FileName;
                existingRecipe.recipeBannerImageFileName = model.FileRecipeBanner.FileName;
                existingRecipe.recipeFlavourImageFileName = model.FileVarietyBanner.FileName;

                using (var stream1 = new MemoryStream())
                {
                    model.File.CopyTo(stream1);
                    existingRecipe.fileData = stream1.ToArray();
                }

                using (var stream2 = new MemoryStream())
                {
                    model.FileRecipeBanner.CopyTo(stream2);
                    existingRecipe.fileDataBannerImage = stream2.ToArray();
                }

                using (var stream3 = new MemoryStream())
                {
                    model.FileVarietyBanner.CopyTo(stream3);
                    existingRecipe.fileDataFlavourImage = stream3.ToArray();
                }

                // Save changes to the existing recipe
                this._context.recipes.Update(existingRecipe);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    recipeId,
                    success = model.File,
                    flavorName = model.flavorName,
                    cookingTime = model.cookingTime,
                    ingredients = model.ingredients,
                    instructions = model.instructions,
                    calories = model.calories,
                    authorId = model.authorId,
                    authorName = model.authorName,
                    status = model.status,
                    rating = model.rating
                });
            }

            return BadRequest("No file or empty file provided");
        }


        //[Authorize]
        [HttpDelete("{id}")]

        public async Task<ActionResult<Recipe>> DeleteRecipe(int id)
        {
            var data = await _context.recipes.FindAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            else
            {
                _context.recipes.Remove(data);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }




        // Noman Api Work




    }
}
