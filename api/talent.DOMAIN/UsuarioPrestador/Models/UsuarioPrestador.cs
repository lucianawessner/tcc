
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
      public string Senha { get; set; }
      public string? Descricao { get; set; }
      public string? Cargo { get; set; }
      public string? Qualificacao { get; set; }
      public string? Localizacao { get; set; }
      public int? IdArquivo { get; set; }
      public string Email { get; set; }
      public Arquivos Arquivos { get; set; }
      public IList<Publicacao> Publicacao { get; set; }
      public IList<Avaliacao> Avaliacao { get; set; }
      public IList<Formulario> Formulario { get; set; }
    }
}
