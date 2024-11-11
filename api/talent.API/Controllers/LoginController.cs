using Microsoft.AspNetCore.Mvc;
using talent.API.Controllers.Base;
using talent.DOMAIN.Models;
using talent.DOMAIN.Services;

namespace talent.API.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : BaseController<UsuarioDto, ILoginService> {
        
        private readonly ILoginService _loginService;

        public LoginController(ILoginService service) : base(service) 
        {
            this._loginService = service;
        }

        [HttpPost]
        [Route("Entrar")]
        public virtual async Task<ActionResult<Response<UsuarioDto>>> Login([FromBody] LoginDto dto) 
        {
            var result = await _loginService.Login(dto);
            return Ok(result);
        }
    }
}
