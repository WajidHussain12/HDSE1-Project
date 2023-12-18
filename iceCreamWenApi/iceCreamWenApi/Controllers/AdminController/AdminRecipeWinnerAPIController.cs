using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminRecipeWinnerAPIController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public AdminRecipeWinnerAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult> GetWinnerList()
        {
            var WinnerData = await _context.recipeWinners.ToListAsync();
            return Ok(WinnerData);
        }



        [HttpPost]

        public async Task<ActionResult> AddUserRecipeToWinnerList(RecipeWinner Winner)
        {
            if (Winner == null)
            {
                return BadRequest();
            }
            else
            {
                await _context.recipeWinners.AddAsync(Winner);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    Success = "Recipe Added To Winner List"
                });
            }
        }


        [HttpDelete("{id}")]

        public async Task<ActionResult> DeleteWinnerRecipe(int id)
        {
            var FindWinnerRecipe = await _context.recipeWinners.FindAsync(id);

            if (FindWinnerRecipe == null)
            {
                return NotFound();
            }
            else
            {
                _context.recipeWinners.Remove(FindWinnerRecipe);
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    Delete = "Winner Deleted Successfully"
                });
            }
        }

    }
}
