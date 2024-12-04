using talent.DOMAIN.Dto;
using talent.DOMAIN.Models;
using talent.INFRA.Base.Services;

namespace talent.DOMAIN.Services 
{
    public interface IUsuarioPrestadorService : IBaseService<UsuarioPrestador> 
    {
        Task<Response<UsuarioPrestador>> Atualizar(int id, UsuarioDocumentoDto dto);
        Task<Response<UsuarioPrestador>> Criar(UsuarioDocumentoDto dto);
    }
}
