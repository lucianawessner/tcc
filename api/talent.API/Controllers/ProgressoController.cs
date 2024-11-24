using talent.DOMAIN.Models;
using talent.DOMAIN.Services;
using talent.API.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace talent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressoController : BaseController<Progresso, IProgressoService>
    {
        private readonly IProgressoService _progressoService;

        public ProgressoController(IProgressoService service) : base(service)
        {
            _progressoService = service;
        }

        [HttpPut]
        [Route("Visualizacao")]
        public virtual async Task<ActionResult<Response<Progresso>>> Visualizacao([FromBody] ProgressoDto dto)
        {
            var result = await _progressoService.AtualizarVisualizacao(dto);
            return Ok(result);
        }
        
        [HttpPut]
        [Route("Aceitar")]
        public virtual async Task<ActionResult<Response<Progresso>>> Aceitar([FromBody] ProgressoDto dto)
        {
            var result = await _progressoService.Aceitar(dto);
            return Ok(result);
        }
        
        [HttpPut]
        [Route("Rejeitar")]
        public virtual async Task<ActionResult<Response<Progresso>>> Rejeitar([FromBody] ProgressoDto dto)
        {
            var result = await _progressoService.Rejeitar(dto);
            return Ok(result);
        }
    }
}
