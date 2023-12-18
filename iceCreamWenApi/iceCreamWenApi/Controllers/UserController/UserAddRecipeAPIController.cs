using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iceCreamWenApi.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAddRecipeAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserAddRecipeAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]

        public async Task<ActionResult> AddUserRecipe(UserRecipe UserRecipe)
        {
            if (UserRecipe == null)
            {
                return BadRequest();
            }
            else
            {
                await _context.userRecipes.AddAsync(UserRecipe);
                _context.SaveChanges();
                return Ok(new
                {
                    RecipeAdded = "Recipe Added Successfuly"
                });
            }
        }

    }
}
