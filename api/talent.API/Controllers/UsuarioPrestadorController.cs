using talent.DOMAIN.Models;
using talent.DOMAIN.Services;
using talent.API.Controllers.Base;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace talent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioPrestadorController : BaseController<UsuarioPrestador, IUsuarioPrestadorService>
    {
        public UsuarioPrestadorController(IUsuarioPrestadorService service) : base(service)
        {
        }

    }
}
