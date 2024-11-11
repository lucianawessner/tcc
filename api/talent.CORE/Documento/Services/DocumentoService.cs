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
    }
}