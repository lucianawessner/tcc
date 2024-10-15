
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class Formulario
    {
      public int Id { get; set; }
      public int IdUsuario { get; set; }
      public int IdServico { get; set; }
      public UsuarioPrestador UsuarioPrestador { get; set; }
      public Servico Servico { get; set; }
      public IList<Progresso> Progresso { get; set; }
    }
}
