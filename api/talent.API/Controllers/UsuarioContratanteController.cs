using Microsoft.AspNetCore.Mvc;
using talent.API.Controllers.Base;
using talent.DOMAIN.Models;
using talent.DOMAIN.Services;

namespace talent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioContratanteController : BaseController<UsuarioContratante, IUsuarioContratanteService>
    {
        public UsuarioContratanteController(IUsuarioContratanteService service) : base(service)
        {
        }

        [HttpPost]
        [Route("Login")]
        public UsuarioDto Login([FromBody] LoginDto dto)
        {
            return service.Login(dto.Usuario, dto.Senha);
        }

    }
}
