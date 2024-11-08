using Microsoft.AspNetCore.Mvc;
using talent.API.Controllers.Base;
using talent.DOMAIN.Models;
using talent.DOMAIN.Services;

namespace talent.API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioPrestadorController : BaseController<UsuarioPrestador, IUsuarioPrestadorService> {
        public UsuarioPrestadorController(IUsuarioPrestadorService service) : base(service) {
        }

    }
}
