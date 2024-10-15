using Microsoft.EntityFrameworkCore;
using talent.API;
using talent.CORE.DataAccess;
using talent.CORE.Repositories;
using talent.CORE.Services;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore); ;
builder.Services.ConfigureServicesOData();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IArquivosRepository, ArquivosRepository>();

builder.Services.AddScoped<IArquivosService, ArquivosService>(); builder.Services.AddScoped<IUsuarioPrestadorRepository, UsuarioPrestadorRepository>();

builder.Services.AddScoped<IUsuarioPrestadorService, UsuarioPrestadorService>(); builder.Services.AddScoped<IUsuarioContratanteRepository, UsuarioContratanteRepository>();

builder.Services.AddScoped<IUsuarioContratanteService, UsuarioContratanteService>(); builder.Services.AddScoped<IServicoRepository, ServicoRepository>();

builder.Services.AddScoped<IServicoService, ServicoService>(); builder.Services.AddScoped<IPublicacaoRepository, PublicacaoRepository>();

builder.Services.AddScoped<IPublicacaoService, PublicacaoService>(); builder.Services.AddScoped<IAvaliacaoRepository, AvaliacaoRepository>();

builder.Services.AddScoped<IAvaliacaoService, AvaliacaoService>(); builder.Services.AddScoped<IFormularioRepository, FormularioRepository>();

builder.Services.AddScoped<IFormularioService, FormularioService>(); builder.Services.AddScoped<IProgressoRepository, ProgressoRepository>();

builder.Services.AddScoped<IProgressoService, ProgressoService>();

builder.Services.AddDbContext<talentDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("talent"));
});

var app = builder.Build();

app.UseCors(cors => cors.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
