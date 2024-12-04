
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class Avaliacao
    {
      public int Id { get; set; }
      public int Estrelas { get; set; }
      public int? QuemAvaliou { get; set; }
      public int? IdPrestador { get; set; }
      public int? IdContratante { get; set; }
      public UsuarioPrestador UsuarioPrestador { get; set; }
      public UsuarioContratante UsuarioContratante { get; set; }
    }
}
