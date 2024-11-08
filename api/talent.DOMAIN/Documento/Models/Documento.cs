
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class Documento
    {
      public int Id { get; set; }
      public string Nome { get; set; }
      public string Tipo { get; set; }
      public string Caminho { get; set; }
      public IList<UsuarioContratante> UsuarioContratante { get; set; }
      public IList<Feed> Feed { get; set; }
      public IList<UsuarioPrestador> UsuarioPrestador { get; set; }
    }
}
