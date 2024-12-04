using talent.DOMAIN.Enums;

namespace talent.DOMAIN.Models 
{
    public class UsuarioDto 
    {
        public int Id { get; set; }
        public string Usuario { get; set; } 
        public string Nome { get; set; } 
        public string Email {  get; set; }
        public ETipoUsuario TipoUsuario { get; set; }
    }
}
