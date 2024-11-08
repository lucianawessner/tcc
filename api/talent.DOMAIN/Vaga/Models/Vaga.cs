
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Models
{
    public class Vaga
    {
      public int Id { get; set; }
      public string Cargo { get; set; }
      public string Localizacao { get; set; }
      public decimal Remuneracao { get; set; }
      public string Descricao { get; set; }
      public string? Requisitos { get; set; }
      public DateTime Prazo { get; set; }
      public DateTime Criacao { get; set; }
      public int IdUsuarioContratante { get; set; }
      public DateTime? Fechamento { get; set; }
      public UsuarioContratante UsuarioContratante { get; set; }
      public IList<FormularioPrestador> FormularioPrestador { get; set; }
    }
}
