using talent.CORE.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.CORE.DataAccess
{
    public class talentDbContext : DbContext
    {
        public talentDbContext(DbContextOptions<talentDbContext> options)
          : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            this.ReadClassesMap(builder);
            base.OnModelCreating(builder);
        }
    }
}
