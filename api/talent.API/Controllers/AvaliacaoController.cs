using talent.DOMAIN.Models;
using talent.DOMAIN.Services;
using talent.API.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace talent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvaliacaoController : BaseController<Avaliacao, IAvaliacaoService>
    {
        private readonly IAvaliacaoService _avaliacaoService;

        public AvaliacaoController(IAvaliacaoService service) : base(service)
        {
            _avaliacaoService = service;
        }

        [HttpGet]
        [Route("Media({usuario})")]
        public virtual int FazerMedia(string usuario) 
        {
            return _avaliacaoService.FazerMedia(usuario);
        }
    }
}
