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
    }
}
