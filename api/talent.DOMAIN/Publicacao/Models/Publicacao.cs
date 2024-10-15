
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class Publicacao
    {
      public int Id { get; set; }
      public string Texto { get; set; }
      public int? IdArquivo { get; set; }
      public int QuantidadeCurtida { get; set; }
      public int IdUsuario { get; set; }
      public Arquivos Arquivos { get; set; }
      public UsuarioPrestador UsuarioPrestador { get; set; }
    }
}
