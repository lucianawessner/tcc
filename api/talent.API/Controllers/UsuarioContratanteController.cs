using Microsoft.AspNetCore.Mvc;
using talent.API.Controllers.Base;
using talent.DOMAIN.Dto;
using talent.DOMAIN.Models;
using talent.DOMAIN.Services;

namespace talent.API.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioContratanteController : BaseController<UsuarioContratante, IUsuarioContratanteService> 
    {
        private readonly IUsuarioContratanteService _service;

        public UsuarioContratanteController(IUsuarioContratanteService service) : base(service) 
        {
            this._service = service;
        }

        [HttpPut]
        [Route("Atualizar/{id}")]
        public virtual async Task<Response<UsuarioContratante>> Atualizar(int id, [FromForm] UsuarioDocumentoDto dto)
        {
            return await _service.Atualizar(id, dto);
        }

        [HttpPost]
        [Route("Criar")]
        public virtual async Task<Response<UsuarioContratante>> Criar([FromForm] UsuarioDocumentoDto dto)
        {
            return await _service.Criar(dto);
        }

    }
}
