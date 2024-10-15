using talent.DOMAIN.Models;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;

namespace talent.API
{
    public static class ODataSetup
    {
        private static ODataModelBuilder objBuilder;

        public static IServiceCollection ConfigureServicesOData(this IServiceCollection services)
        {
            objBuilder = new ODataConventionModelBuilder();
            ConfigureEntitySets(objBuilder);

            services.AddControllers().AddOData(
            options => options.Select().Filter().OrderBy().Expand().Count().SetMaxTop(null).AddRouteComponents(
                "odata",
                objBuilder.GetEdmModel()));
            return services;
        }

        private static void ConfigureEntitySets(ODataModelBuilder builder)
        {
          builder.EntitySet<Arquivos>("Arquivos").EntityType.HasKey(t => t.Id);
          builder.EntitySet<UsuarioPrestador>("UsuarioPrestador").EntityType.HasKey(t => t.Id);
          builder.EntitySet<UsuarioContratante>("UsuarioContratante").EntityType.HasKey(t => t.Id);
          builder.EntitySet<Servico>("Servico").EntityType.HasKey(t => t.Id);
          builder.EntitySet<Publicacao>("Publicacao").EntityType.HasKey(t => t.Id);
          builder.EntitySet<Avaliacao>("Avaliacao").EntityType.HasKey(t => t.Id);
          builder.EntitySet<Formulario>("Formulario").EntityType.HasKey(t => t.Id);
          builder.EntitySet<Progresso>("Progresso").EntityType.HasKey(t => t.Id);
        }
    }
}
