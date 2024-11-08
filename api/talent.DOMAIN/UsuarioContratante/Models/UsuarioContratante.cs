
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class UsuarioContratante
    {
      public int Id { get; set; }
      public string Usuario { get; set; }
      public string Senha { get; set; }
      public string? Descricao { get; set; }
      public string? Localizacao { get; set; }
      public string? Cargo { get; set; }
      public int? IdDocumento { get; set; }
      public string Email { get; set; }
      public int? DataNascimento { get; set; }
      public Documento Documento { get; set; }
      public IList<Avaliacao> Avaliacao { get; set; }
      public IList<Vaga> Vaga { get; set; }
    }
}
