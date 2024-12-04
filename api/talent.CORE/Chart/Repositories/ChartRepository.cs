using talent.CORE.DataAccess;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.INFRA.Base.Core.Repositories;

namespace talent.CORE.Repositories {
    public class ChartRepository : BaseRepository<Dataset, TalentTrialDbContext>, IChartRepository {
        public ChartRepository(TalentTrialDbContext context)
            : base(context) {
        }
    }
}
