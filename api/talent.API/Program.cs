using Microsoft.EntityFrameworkCore;
using talent.API;
using talent.CORE.DataAccess;
using talent.CORE.Repositories;
using talent.CORE.Services;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.ConfigureServicesOData();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IVagaRepository, VagaRepository>();
builder.Services.AddScoped<IVagaService, VagaService>(); builder.Services.AddScoped<IDocumentoRepository, DocumentoRepository>();
builder.Services.AddScoped<IDocumentoService, DocumentoService>(); builder.Services.AddScoped<IFeedRepository, FeedRepository>();
builder.Services.AddScoped<IFeedService, FeedService>(); builder.Services.AddScoped<IFormularioPrestadorRepository, FormularioPrestadorRepository>();
builder.Services.AddScoped<IFormularioPrestadorService, FormularioPrestadorService>(); builder.Services.AddScoped<IProgressoRepository, ProgressoRepository>();
builder.Services.AddScoped<IProgressoService, ProgressoService>(); builder.Services.AddScoped<IAvaliacaoRepository, AvaliacaoRepository>();
builder.Services.AddScoped<IAvaliacaoService, AvaliacaoService>(); builder.Services.AddScoped<IUsuarioPrestadorRepository, UsuarioPrestadorRepository>();
builder.Services.AddScoped<IUsuarioPrestadorService, UsuarioPrestadorService>(); builder.Services.AddScoped<IUsuarioContratanteRepository, UsuarioContratanteRepository>();
builder.Services.AddScoped<ILoginService, LoginService>(); builder.Services.AddScoped<ILoginRepository, LoginRepository>();

builder.Services.AddScoped<IUsuarioContratanteService, UsuarioContratanteService>();
builder.Services.AddDbContext<TalentTrialDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("TalentTrial"));
});

builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true).AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null); ;

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin() // Permite qualquer origem
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
