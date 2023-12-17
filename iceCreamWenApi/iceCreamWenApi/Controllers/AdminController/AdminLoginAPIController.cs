using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminLoginAPIController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        public AdminLoginAPIController(IConfiguration configuration, ApplicationDbContext context)
        {
            _context = context;
            _configuration = configuration;
        }


        [HttpPost]
        public async Task<IActionResult> CheckCredentials([FromForm] AdminLoginModel Credentials)
        {
            var adminlogin = await _context.adminLogins.FirstOrDefaultAsync(x => x.adminemail == Credentials.adminemail && x.adminpassword == Credentials.adminpassword);


            if (adminlogin == null)
            {
                return Unauthorized();
            }
            else
            {
                var JWTtoken = generateToken(adminlogin.adminemail);
                return Ok(new
                {
                    Authentication = "Admin Authenticate Successfully",
                    Status = true,
                    AdminId = adminlogin?.adminid,
                    Jwttoken = JWTtoken
                });
            }
        }

        private string generateToken(string userName)
        {

            var claims = new[]
            {
                //new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("UserName",userName),
                new Claim(JwtRegisteredClaimNames.Exp, DateTime.UtcNow.AddMinutes(15).ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtRegisteredClaimNames.Name, userName)

             };


            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims,
                expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
