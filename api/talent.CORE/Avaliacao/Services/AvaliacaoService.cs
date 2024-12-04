using talent.INFRA.Base.Core.Services;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;

namespace talent.CORE.Services
{
    public class AvaliacaoService : BaseService<Avaliacao, IAvaliacaoRepository>, IAvaliacaoService
    {
        private readonly IUsuarioContratanteService _usuarioContratanteService;
        private readonly IUsuarioPrestadorService _usuarioPrestadorService;

        public AvaliacaoService(
            IAvaliacaoRepository repository,
            IUsuarioContratanteService usuarioContratanteService,
            IUsuarioPrestadorService usuarioPrestadorService) : base(repository) 
        {
            _usuarioContratanteService = usuarioContratanteService;
            _usuarioPrestadorService = usuarioPrestadorService;
        }

        int IAvaliacaoService.FazerMedia(string usuario) 
        {
            var prestador = _usuarioPrestadorService.GetAllNoTracking()
                .Where(x => x.Usuario == usuario)
                .FirstOrDefault();

            var contratante = _usuarioContratanteService.GetAllNoTracking()
                .Where(x => x.Usuario == usuario)
                .FirstOrDefault();

            if (prestador != null) 
            {
                var avaliacoes = GetAllNoTracking()
                     .Where(x => x.IdPrestador == prestador.Id)
                     .Where(x => x.QuemAvaliou == 2)
                     .ToList();

                var quantidadeAvaliacoes = avaliacoes.Count();
                var soma = avaliacoes.Sum(x => x.Estrelas);

                if (quantidadeAvaliacoes == 0)
                {
                    return 5;
                }

                var media = soma / quantidadeAvaliacoes;

                return media;
            } 
            
            if (contratante != null) 
            {
                var avaliacoes = GetAllNoTracking()
                     .Where(x => x.IdContratante == contratante.Id)
                     .Where(x => x.QuemAvaliou == 1)
                     .ToList();

                var quantidadeAvaliacoes = avaliacoes.Count();
                var soma = avaliacoes.Sum(x => x.Estrelas);

                if (quantidadeAvaliacoes == 0)
                {
                    return 5;
                }

                var media = soma / quantidadeAvaliacoes;

                return media;
            }


            return 0;
        }
    }
}