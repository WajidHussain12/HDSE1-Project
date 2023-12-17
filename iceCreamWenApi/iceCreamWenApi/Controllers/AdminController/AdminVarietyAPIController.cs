using iceCreamWenApi.Models;
using iceCreamWenApi.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Dynamic;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminVarietyAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileService _uploadService;

        public AdminVarietyAPIController(ApplicationDbContext context, IFileService uploadService)
        {
            _context = context;
            _uploadService = uploadService;
        }


        //[HttpGet("GetVarietiesDataWithRecipes")]
        //public ActionResult<IEnumerable<object>> GetAllVarietiesWithRecipes()
        //{
        //    var varietiesWithRecipes = _context.varieties
        //        .Select(v => new
        //        {
        //            VarietyID = v.VarietyID,
        //            RecipeID = v.RecipeID,
        //            RecipeName = _context.recipes
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

        [HttpGet]

        public async Task<IActionResult> GetAllRecipesWithFiles()
        {
            try
            {
                var allVarieties = await _context.varieties.ToListAsync();

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
                        varietyInfo.RecipeName = _context.recipes.Where(r => r.recipeid == varietyData.RecipeID).Select(r => r.flavorName).FirstOrDefault();
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





        [Consumes("multipart/form-data")]
        [HttpPost]
        public async Task<IActionResult> AddVariety([FromForm] VarietyFileModel model)
        {
            if (model.VarietyImageFile.Length > 0)
            {


                var Varietydata = new Varieties()
                {
                    RecipeID = model.RecipeID,
                    varietyName = model.varietyName,
                    deliveryTime = model.deliveryTime,
                    cashOnDelivery = model.cashOnDelivery,
                    price = model.price,
                    VarietyImageFileName = model.VarietyImageFile.FileName,
                };

                using (var stream = new MemoryStream())
                {
                    model.VarietyImageFile.CopyTo(stream);
                    Varietydata.varietyImg = stream.ToArray();
                }

                await this._context.varieties.AddAsync(Varietydata);
                await _context.SaveChangesAsync();

                var VarietyID = Varietydata.VarietyID;
                //await Downloading(recipeId);

                return Ok(
                   new
                   {
                       VarietyID,
                       RecipeID = model.RecipeID,
                       VarietyImageFile = model.VarietyImageFile,
                       varietyName = model.varietyName,
                       deliveryTime = model.deliveryTime,
                       cashOnDelivery = model.cashOnDelivery,
                       price = model.price
                   }
                   );

            }
            return BadRequest("No file or empty file provided");
        }


        [HttpGet("{id}")]

        public async Task<ActionResult<List<Varieties>>> getVarietyDataById(int id)
        {
            var varietyData = await _context.varieties.FindAsync(id);
            if (varietyData == null)
            {
                return BadRequest();
            }

            else
            {

                return Ok(varietyData);
            }

        }











        [Consumes("multipart/form-data")]
        [HttpPut("{varietyId}")]

        public async Task<IActionResult> updateVariety(int varietyid, [FromForm] VarietyFileModel model)
        {
            var ExistingVariety = await _context.varieties.FindAsync(varietyid);
            if (ExistingVariety == null)
            {
                return NotFound("Variety Not Found");
            }
            if (model.VarietyImageFile.Length > 0)
            {

                ExistingVariety.RecipeID = model.RecipeID;
                ExistingVariety.varietyName = model.varietyName;
                ExistingVariety.deliveryTime = model.deliveryTime;
                ExistingVariety.cashOnDelivery = model.cashOnDelivery;
                ExistingVariety.price = model.price;
                ExistingVariety.VarietyImageFileName = model.VarietyImageFile.FileName;


                using (var stream = new MemoryStream())
                {
                    model.VarietyImageFile.CopyTo(stream);
                    ExistingVariety.varietyImg = stream.ToArray();
                }

                this._context.varieties.Update(ExistingVariety);
                //this._context.recipes.Update(existingRecipe);
                await _context.SaveChangesAsync();

                //var VarietyID = Varietydata.VarietyID;
                //await Downloading(recipeId);

                return Ok(
                   new
                   {
                       //VarietyID,
                       RecipeID = model.RecipeID,
                       varietyName = model.varietyName,
                       deliveryTime = model.deliveryTime,
                       cashOnDelivery = model.cashOnDelivery,
                       price = model.price,
                       VarietyImageFile = model.VarietyImageFile
                   }
                   );

            }
            return BadRequest("No file or empty file provided");
        }


        [HttpDelete("{id}")]

        public async Task<ActionResult<Varieties>> DeleteVariety(int id)
        {
            var ExistingRecord = await _context.varieties.FindAsync(id);

            if (ExistingRecord == null)
            {
                return NotFound();

            }
            else
            {
                _context.varieties.Remove(ExistingRecord);
                await _context.SaveChangesAsync();
                return Ok(new
                { Message = "Variety Deleted On the Server" }
                );
            }

        }











    }

}
