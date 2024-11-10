using talent.DOMAIN.Models;
using talent.INFRA.Base.Services;

namespace talent.DOMAIN.Services 
{
    public interface ILoginService : IBaseService<UsuarioDto> 
    {
        Task<Response<UsuarioDto>> Login(LoginDto dto);
    }
}
