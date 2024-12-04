using talent.DOMAIN.Models;
using talent.INFRA.Base.Services;

namespace talent.DOMAIN.Services 
{
    public interface IChartService : IBaseService<Dataset>
    {
        List<Dataset> GetChartData();
    }
}
