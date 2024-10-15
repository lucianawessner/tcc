using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;
using talent.INFRA.Base.Core.Services;

namespace talent.CORE.Services
{
    public class UsuarioContratanteService : BaseService<UsuarioContratante, IUsuarioContratanteRepository>, IUsuarioContratanteService
    {
        public UsuarioContratanteService(IUsuarioContratanteRepository repository) : base(repository)
        {
        }
        public UsuarioDto Login(string username, string password)
        {
            var contratante = GetAllNoTracking()
                .Where(x => x.Senha == password)
                .Where(x => x.Usuario == username)
                .FirstOrDefault() ?? throw new Exception("Usuario não existente");

            var usuarioDto = new UsuarioDto
            {
                Id = contratante.Id,
                Usuario = contratante.Usuario,
                Tipo = "Contratante"
            };

            return usuarioDto;
        }

    }
}