using talent.DOMAIN.Models;
using talent.INFRA.Base.Services;

namespace talent.DOMAIN.Services 
{
    public interface IProgressoService : IBaseService<Progresso> 
    {
        Task<Response<Progresso>> AtualizarVisualizacao(ProgressoDto dto);
        Task<Response<Progresso>> Aceitar(ProgressoDto dto);
        Task<Response<Progresso>> Rejeitar(ProgressoDto dto);
    }
}
