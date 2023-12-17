using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace iceCreamWenApi.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginAPIController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public UserLoginAPIController(IConfiguration configuration, ApplicationDbContext context)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]

        public async Task<IActionResult> UserLogin([FromForm] UserLogin userLogin)
        {
            var data = await _context.users.FirstOrDefaultAsync(x => x.email == userLogin.email && x.password == userLogin.password);

            if (data == null)
            {
                return NotFound();
            }
            else
            {
                var JWTtoken = generateToken(data.email);
                return Ok(new
                {
                    userdata = data,
                    JWTtoken = JWTtoken
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
