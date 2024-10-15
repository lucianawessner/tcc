using talent.INFRA.Base.Core.Services;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.CORE.Services
{
    public class ProgressoService : BaseService<Progresso, IProgressoRepository>, IProgressoService
    {
        public ProgressoService(IProgressoRepository repository) : base(repository)
        {
        }
    }
}