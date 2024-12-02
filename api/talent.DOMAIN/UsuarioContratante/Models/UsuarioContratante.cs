namespace talent.DOMAIN.Models 
{
    public class UsuarioContratante 
    {
        public UsuarioContratante()
        {
            DataCriacao = DateTime.Now;
        }

        public int Id { get; set; }
        public string Usuario { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string? Descricao { get; set; }
        public string? Localizacao { get; set; }
        public string? Cargo { get; set; }
        public string? Experiencia { get; set; }
        public int? IdDocumento { get; set; }
        public string Email { get; set; }
        public DateTime? DataNascimento { get; set; }
        public DateTime? DataCriacao { get; set; }
        public Documento Documento { get; set; }
        public IList<Avaliacao> Avaliacao { get; set; }
        public IList<Vaga> Vaga { get; set; }
    }
}
