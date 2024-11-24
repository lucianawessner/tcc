using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;
using talent.INFRA.Base.Core.Services;

namespace talent.CORE.Services
{
    public class ProgressoService : BaseService<Progresso, IProgressoRepository>, IProgressoService
    {
        private readonly IProgressoRepository _repository;

        public ProgressoService(IProgressoRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<Response<Progresso>> AtualizarVisualizacao(ProgressoDto dto)
        {
            var progresso = GetAll().Where(x => x.Id == dto.Id).FirstOrDefault();

            if (progresso == null)
            {
                return new Response<Progresso> { Data = null, Message = "Progresso não encontrado" };
            }

            progresso.Visualizado = true;

            await _repository.Context.SaveChangesAsync();

            return new Response<Progresso> { Data = progresso, Message = "Progresso visualizado com sucesso" };
        }


        public async Task<Response<Progresso>> Aceitar(ProgressoDto dto)
        {
            var progresso = GetAll().Where(x => x.Id == dto.Id).FirstOrDefault();

            if (progresso == null)
            {
                return new Response<Progresso> { Data = null, Message = "Progresso não encontrado" };
            }

            progresso.Aceito = true;
            progresso.Contato = false;

            await _repository.Context.SaveChangesAsync();

            return new Response<Progresso> { Data = progresso, Message = "Progresso aceito com sucesso" };
        }

        public async Task<Response<Progresso>> Rejeitar(ProgressoDto dto)
        {
            var progresso = GetAll().Where(x => x.Id == dto.Id).FirstOrDefault();

            if (progresso == null)
            {
                return new Response<Progresso> { Data = null, Message = "Progresso não encontrado" };
            }

            progresso.Aceito = false;
            progresso.Contato = false;

            await _repository.Context.SaveChangesAsync();

            return new Response<Progresso> { Data = progresso, Message = "Progresso rejeitado com sucesso" };
        }
    }
}