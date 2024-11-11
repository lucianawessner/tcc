using talent.INFRA.Base.Core.Services;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;

namespace talent.CORE.Services
{
    public class DocumentoService : BaseService<Documento, IDocumentoRepository>, IDocumentoService
    {
        private readonly IDocumentoRepository repository;
        public DocumentoService(IDocumentoRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        public async Task<Response<Documento>> SalvarDocumento(DocumentoDto dto)
        {
            var documento = new Documento
            {
                Nome = dto.Nome,
                Tipo = dto.Tipo,
                Caminho = dto.Caminho
            };

            repository.Add(documento);
            await repository.Context.SaveChangesAsync();

            return new Response<Documento>(documento, 201, "Documento salvo com sucesso");
        }
    }
}