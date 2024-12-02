
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class UsuarioPrestador
    {
      public int Id { get; set; }
      public string Usuario { get; set; }
      public string? Nome { get; set; }
      public string Senha { get; set; }
      public string? Descricao { get; set; }
      public string? Cargo { get; set; }
      public string? Experiencia { get; set; }
      public string? Localizacao { get; set; }
      public int? IdDocumento { get; set; }
      public string Email { get; set; }
      public DateTime? DataNascimento { get; set; }
      public Documento Documento { get; set; }
      public IList<FormularioPrestador> FormularioPrestador { get; set; }
      public IList<Feed> Feed { get; set; }
      public IList<Avaliacao> Avaliacao { get; set; }
    }
}
