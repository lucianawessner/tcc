using talent.CORE.DataAccess;
using talent.INFRA.Base.Core.Repositories;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.CORE.Repositories
{
    public class ServicoRepository : BaseRepository<Servico, talentDbContext>, IServicoRepository
    {
        public ServicoRepository(talentDbContext context) 
            : base(context)
        {
        }
    }
}
