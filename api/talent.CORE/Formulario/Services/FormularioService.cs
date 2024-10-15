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
    public class FormularioService : BaseService<Formulario, IFormularioRepository>, IFormularioService
    {
        public FormularioService(IFormularioRepository repository) : base(repository)
        {
        }
    }
}