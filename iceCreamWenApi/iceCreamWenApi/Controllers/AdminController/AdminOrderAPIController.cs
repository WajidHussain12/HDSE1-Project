using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminOrderAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AdminOrderAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            var data = await _context.orders.ToListAsync();
            return Ok(data);
        }


    }
}
