using Microsoft.AspNetCore.Mvc;
using talent.API.Controllers.Base;
using talent.DOMAIN.Models;
using talent.DOMAIN.Services;

namespace talent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : BaseController<Feed, IFeedService>
    {
        private readonly IFeedService _feedService;
        private readonly string _diretorioFotos = Path.Combine(@"C:\Dev\pi\ui\src\assets");

        public FeedController(IFeedService service) : base(service)
        {
            this._feedService = service;
        }

        [HttpPost]
        [Route("Publicar")]
        public virtual async Task<Response<Feed>> Publicar([FromForm] FeedDto dto)
        {
            return await _feedService.Publicar(dto);
        }
        
        [HttpPut]
        [Route("Curtir/{id}")]
        public virtual async Task<Response<Feed>> Curtir(int id)
        {
            return await _feedService.Curtir(id);
        }
    }
}
