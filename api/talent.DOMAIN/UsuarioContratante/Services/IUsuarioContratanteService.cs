using talent.DOMAIN.Models;
using talent.INFRA.Base.Services;

namespace talent.DOMAIN.Services
{
    public interface IUsuarioContratanteService : IBaseService<UsuarioContratante>
    {

        UsuarioDto Login(string username, string password);
    }
}
