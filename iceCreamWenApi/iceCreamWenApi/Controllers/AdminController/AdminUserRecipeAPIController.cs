using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUserRecipeAPIController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public AdminUserRecipeAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<IActionResult> GetUserRecipe()
        {
            var userRecipeData = await _context.userRecipes.ToListAsync();
            return Ok(userRecipeData);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult> GetIndividuallyUserRecipeData(int id)
        {
            var userRecipeData = await _context.userRecipes.FindAsync(id);
            if(userRecipeData == null) 
            {
                return BadRequest();
            }
            else
            {
                return Ok(userRecipeData);
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            var userRecipe = await _context.userRecipes.FindAsync(id);
            if (userRecipe == null)
            {
                return BadRequest();
            }
            else
            {
                _context.userRecipes.Remove(userRecipe);
                _context.SaveChanges();
                return Ok(new
                {
                    Delete = "Book Deleted"
                });
            }
        }
    }
}
