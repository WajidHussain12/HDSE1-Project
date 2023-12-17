using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iceCreamWenApi.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGetApiController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public UserGetApiController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserData(int id)
        {
            var user = await _context.users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
