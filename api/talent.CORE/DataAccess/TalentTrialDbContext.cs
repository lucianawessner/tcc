using Microsoft.EntityFrameworkCore;
using talent.CORE.Extensions;

namespace talent.CORE.DataAccess {
    public class TalentTrialDbContext : DbContext {
        public TalentTrialDbContext(DbContextOptions<TalentTrialDbContext> options)
          : base(options) {
        }

        protected override void OnModelCreating(ModelBuilder builder) {
            this.ReadClassesMap(builder);
            base.OnModelCreating(builder);
        }
    }
}
