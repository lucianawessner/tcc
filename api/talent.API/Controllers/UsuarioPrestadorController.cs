using Microsoft.AspNetCore.Mvc;
using talent.API.Controllers.Base;
using talent.DOMAIN.Dto;
using talent.DOMAIN.Models;
using talent.DOMAIN.Services;

namespace talent.API.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioPrestadorController : BaseController<UsuarioPrestador, IUsuarioPrestadorService> 
    {
        private readonly IUsuarioPrestadorService _service;

        public UsuarioPrestadorController(IUsuarioPrestadorService service) : base(service) 
        {
            this._service = service;
        }

        [HttpPut]
        [Route("Atualizar/{id}")]
        public virtual async Task<Response<UsuarioPrestador>> Atualizar(int id, [FromForm] UsuarioDocumentoDto dto)
        {
            return await _service.Atualizar(id, dto);
        }

    }
}
