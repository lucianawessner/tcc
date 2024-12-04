using Microsoft.AspNetCore.Mvc;
using talent.API.Controllers.Base;
using talent.DOMAIN.Models;
using talent.DOMAIN.Services;

namespace talent.API.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : BaseController<Dataset, IChartService> 
    {
        private readonly IChartService _chartService;

        public ChartController(IChartService service) : base(service) 
        {
            this._chartService = service;
        }

        [HttpGet]
        [Route("BuscarRelatorio")]
        public virtual async Task<ActionResult<Dataset>> GetChartData() 
        {
            var result = _chartService.GetChartData();
            return Ok(result);
        }
    }
}
