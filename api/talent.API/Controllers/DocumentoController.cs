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
    public class DocumentoController : BaseController<Documento, IDocumentoService>
    {
        private readonly IDocumentoService _documentoService;

        public DocumentoController(IDocumentoService service) : base(service)
        {
            _documentoService = service;
        }

        [HttpGet("GetFile/{fileName}")]
        public IActionResult GetImage(string fileName) 
        {
            var file = _documentoService.GetAllNoTracking()
                .Where(x => x.Nome == fileName)
                .FirstOrDefault() ?? _documentoService.GetAllNoTracking()
                .Where(x => x.Nome == "69C076BE-34A2-4E12-B6ED-D7ABE845CE53")
                .FirstOrDefault();

            var fileBytes = System.IO.File.ReadAllBytes(file.Caminho);

            return File(fileBytes, file.Tipo);
        }
    }
}
