using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ModelsLibrary.Authorization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace ReactRestApiProject.Areas.Users.Controllers
{
    [Route("/login")]
    public class UserController : Controller
    {
        private readonly UserService userModel;
        public UserController(UserDbContext context)
        {
            userModel = new UserService(context);
        }
        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            var identity = GetIdentity(user.Login, user.Password);

            if (identity == null)
            {
                return BadRequest(new { error = "Invalid login or password." });
            }

            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME_IN_MINUTES)),
                signingCredentials: new SigningCredentials(
                    AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256)
                );
            var encodedJWT = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJWT,
                username = user.Login
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string login, string password)
        {
            User user = userModel.GetUser(login, password);
            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new Claim("user", user.Login),
                    new Claim("role", user.UserRole?.Name)
                };
                ClaimsIdentity identity = new ClaimsIdentity(claims,
                    "Token",
                    user.Login,
                    user.UserRole?.Name);
                return identity;
            }

            return null;
        }
    }
}
