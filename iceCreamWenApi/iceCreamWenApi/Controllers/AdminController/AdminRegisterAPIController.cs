using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminRegisterAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AdminRegisterAPIController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpPost]

        public async Task<ActionResult<AdminLogin>> AddUser(AdminLogin admin)
        {
            await _context.adminLogins.AddAsync(admin);
            await _context.SaveChangesAsync();
            return Ok(admin);
        }
    }
}
