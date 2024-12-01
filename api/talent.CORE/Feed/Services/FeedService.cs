using talent.INFRA.Base.Core.Services;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace talent.CORE.Services
{
    public class FeedService : BaseService<Feed, IFeedRepository>, IFeedService
    {
        private readonly string _diretorioFotos = Path.Combine(@"C:\Dev\pi\ui\src\assets");
        private readonly IUsuarioPrestadorService usuarioPrestadorService;
        private readonly IFeedRepository repository;

        public FeedService(
            IFeedRepository repository, 
            IUsuarioPrestadorService usuarioPrestadorService) : base(repository)
        {
            if (!Directory.Exists(_diretorioFotos))
            {
                Directory.CreateDirectory(_diretorioFotos);
            }

            this.usuarioPrestadorService = usuarioPrestadorService;
            this.repository = repository;
        }

        public async Task<Response<Feed>> Publicar(FeedDto publicacao)
        {
            if (string.IsNullOrEmpty(publicacao.Usuario) || string.IsNullOrEmpty(publicacao.Texto))
            {
                throw new ArgumentException("Usuário e Texto são obrigatórios.");
            }

            var usuario = await usuarioPrestadorService.GetAllNoTracking()
            .Where(x => x.Usuario == publicacao.Usuario)
            .FirstOrDefaultAsync();

            if (usuario is null)
            {
                throw new ArgumentException("Usuário não encontrado na base de dados.");
            }

            var feed = new Feed
            {
                Texto = publicacao.Texto,
                IdUsuarioPrestador = usuario.Id,
                QuantidadeCurtida = 0
            };

            if (publicacao.Foto != null)
            {
                var dto = await SalvarFoto(publicacao.Foto);

                var documento = new Documento
                {
                    Nome = dto.Nome,
                    Tipo = dto.Tipo,
                    Caminho = dto.Caminho
                };

                feed.Documento = documento;

                repository.Add(feed);
                await repository.Context.SaveChangesAsync();

                return new Response<Feed>(feed, 201, "Publicação feita com sucesso, com foto");
            }

            repository.Add(feed);
            await repository.Context.SaveChangesAsync();

            return new Response<Feed>(feed, 201, "Publicação feita com sucesso, sem foto");
        }

        private async Task<DocumentoDto> SalvarFoto(IFormFile foto)
        {
            var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(foto.FileName);

            var caminhoCompleto = Path.Combine(_diretorioFotos, nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await foto.CopyToAsync(stream);
            }

            return new DocumentoDto
            {
                Caminho = caminhoCompleto,
                Nome = nomeArquivo,
                Tipo = foto.ContentType
            };
        }
    }
}