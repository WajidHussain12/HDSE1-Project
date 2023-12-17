using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminUserAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminUserAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var userData = await _context.users.ToListAsync();
            return Ok(userData);
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<List<User>>> GetUserByID(int id)
        {

            var userData = await _context.users.FindAsync(id);

            if (userData == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(userData);

            }
        }


        [HttpPost]

        public async Task<ActionResult<User>> AddUser(User user)
        {
            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }



        [HttpPut("{id}")]

        public async Task<ActionResult<User>> UpdataUser(int id, User user)
        {
            if (id != user.userid)
            {
                return BadRequest();

            }
            else
            {
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(user);
            }
        }



        [HttpDelete("{id}")]

        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var data = await _context.users.FindAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            else
            {
                _context.users.Remove(data);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }

    }
}
