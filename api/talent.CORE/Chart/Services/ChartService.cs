using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.INFRA.Base.Core.Services;

namespace talent.DOMAIN.Services;

public class ChartService : BaseService<Dataset, IChartRepository>, IChartService  
{
    private readonly IUsuarioContratanteService _usuarioContratanteService;
    private readonly IUsuarioPrestadorService _usuarioPrestadorService;

    public ChartService(
        IChartRepository repository,
        IUsuarioContratanteService usuarioContratanteService,
        IUsuarioPrestadorService usuarioPrestadorService) : base(repository) {
        _usuarioContratanteService = usuarioContratanteService;
        _usuarioPrestadorService = usuarioPrestadorService;
    }

    public List<Dataset> GetChartData() 
    {
        var contratantes = _usuarioContratanteService.GetAllNoTracking()
            .Select(x => x.DataCriacao).ToList();

        var prestadores = _usuarioPrestadorService.GetAllNoTracking()
            .Select(x => x.DataCriacao).ToList();

        var todosMeses = Enumerable.Range(1, 12)
             .Select(m => new DateTime(DateTime.Now.Year, m, 1).ToString("MMMM yyyy"))
             .ToList();

        var contratantesPorMes = contratantes
             .GroupBy(x => new { x.Value.Year, x.Value.Month })
             .Select(group => new {
                 MesAno = new DateTime(group.Key.Year, group.Key.Month, 1).ToString("MMMM yyyy"),
                 Quantidade = group.Count()
             })
             .ToList();

        var prestadoresPorMes = prestadores
            .GroupBy(x => new { x.Value.Year, x.Value.Month })
            .Select(group => new {
                MesAno = new DateTime(group.Key.Year, group.Key.Month, 1).ToString("MMMM yyyy"),
                Quantidade = group.Count()
            })
            .ToList();

        var contratantesPorMesAlinhados = todosMeses.Select(mes => {
            return contratantesPorMes.FirstOrDefault(x => x.MesAno == mes)?.Quantidade ?? 0;
        }).ToList();

        var prestadoresPorMesAlinhados = todosMeses.Select(mes => {
            return prestadoresPorMes.FirstOrDefault(x => x.MesAno == mes)?.Quantidade ?? 0;
        }).ToList();

        var datasets = new List<Dataset>
{
            new Dataset
            {
                Label = "Quantidade cadastros de Contratante",
                Data = contratantesPorMesAlinhados,
                BackgroundColor = "rgb(201, 223, 138, 0.4)",
                BorderColor = "#77ab59",
                BorderWidth = 1
            },
            new Dataset
            {
                Label = "Quantidade cadastros de Prestador",
                Data = prestadoresPorMesAlinhados,
                BackgroundColor = "rgb(201, 223, 150, 0.4)",
                BorderColor = "#77ab59",
                BorderWidth = 1
            }
        };

        return datasets;
    }
}
