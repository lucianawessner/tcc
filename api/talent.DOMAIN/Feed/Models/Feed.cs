
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class Feed
    {
      public int Id { get; set; }
      public string Texto { get; set; }
      public int? IdDocumento { get; set; }
      public int QuantidadeCurtida { get; set; }        
      public DateTime? DataCriacao { get; set; }
      public int IdUsuarioPrestador { get; set; }
      public Documento Documento { get; set; }
      public UsuarioPrestador UsuarioPrestador { get; set; }
    }
}
