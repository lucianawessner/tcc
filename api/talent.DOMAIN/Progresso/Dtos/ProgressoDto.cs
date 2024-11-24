namespace talent.DOMAIN.Models
{
    public class ProgressoDto
    {
        public int Id { get; set; }
        public bool? Visualizado { get; set; }
        public bool? Aceito { get; set; }
        public bool? Contato { get; set; }
        public int IdFormularioPrestador { get; set; }
    }
}
