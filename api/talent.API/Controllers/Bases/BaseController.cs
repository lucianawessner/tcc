using talent.INFRA.Base.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace talent.API.Controllers.Base
{
    [ApiController]
    public class BaseController<T, TService> : ODataController
        where T : class 
        where TService : IBaseService<T>
    {
        protected TService service { get; set; }
        public BaseController(TService service)
        {
            this.service = service;
        }

        [HttpGet]
        [EnableQuery]
        public virtual IQueryable<T> Get()
        {
            return service.GetAllNoTracking();
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] T obj)
        {
            return Ok(await service.AddAsync(obj));
        }

        [HttpPut]
        public virtual async Task<IActionResult> Update([FromBody] T obj)
        {
            return Ok(await service.UpdateAsync(obj));
        }

        [HttpDelete]
        public virtual async Task<IActionResult> Delete(T obj)
        {
            var result = await service.DeleteAsync(obj);
            return Ok(result);
        }
    }
}
