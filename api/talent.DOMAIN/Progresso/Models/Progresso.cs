namespace talent.DOMAIN.Models
{
    public class Progresso
    {
        public int Id { get; set; }
        public bool Visualizado { get; set; }
        public bool? Aceito { get; set; }
        public bool Contato { get; set; }
        public int IdFormularioPrestador { get; set; }
        public FormularioPrestador FormularioPrestador { get; set; }
    }
}
