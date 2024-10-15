
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
      public string? Area { get; set; }
      public int? IdArquivo { get; set; }
      public string? Email { get; set; }
      public Arquivos Arquivos { get; set; }
      public IList<Servico> Servico { get; set; }
      public IList<Avaliacao> Avaliacao { get; set; }
    }
}
