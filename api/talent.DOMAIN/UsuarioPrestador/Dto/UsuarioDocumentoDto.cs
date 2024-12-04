using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.DOMAIN.Dto
{
    public class UsuarioDocumentoDto
    {
        public string Usuario { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string? Cargo { get; set; }
        public string Experiencia { get; set; }
        public string Localizacao { get; set; }
        public int? IdDocumento { get; set; }
        public string Email { get; set; }
        public string? Senha { get; set; }
        public DateTime? DataNascimento { get; set; }
        public DateTime? DataCriacao { get; set; }
        public IFormFile? Foto { get; set; }  // Foto pode ser nula
    }
}
