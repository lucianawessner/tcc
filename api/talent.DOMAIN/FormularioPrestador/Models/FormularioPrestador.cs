namespace talent.DOMAIN.Models
{
    public class FormularioPrestador
    {
        public int Id { get; set; }
        public int IdUsuarioPrestador { get; set; }
        public int IdVaga { get; set; }
        public UsuarioPrestador UsuarioPrestador { get; set; }
        public Vaga Vaga { get; set; }
        public IList<Progresso> Progresso { get; set; }
    }
}
