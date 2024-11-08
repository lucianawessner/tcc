using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;
using talent.DOMAIN.Models;

namespace talent.API {
    public static class ODataSetup {
        private static ODataModelBuilder objBuilder;

        public static IServiceCollection ConfigureServicesOData(this IServiceCollection services) {
            objBuilder = new ODataConventionModelBuilder();
            ConfigureEntitySets(objBuilder);

            services.AddControllers().AddOData(
            options => options.Select().Filter().OrderBy().Expand().Count().SetMaxTop(null).AddRouteComponents(
                "odata",
                objBuilder.GetEdmModel()));
            return services;
        }

        private static void ConfigureEntitySets(ODataModelBuilder builder) {
            builder.EntitySet<Vaga>("Vaga").EntityType.HasKey(t => t.Id);
            builder.EntitySet<Documento>("Documento").EntityType.HasKey(t => t.Id);
            builder.EntitySet<Feed>("Feed").EntityType.HasKey(t => t.Id);
            builder.EntitySet<FormularioPrestador>("FormularioPrestador").EntityType.HasKey(t => t.Id);
            builder.EntitySet<Progresso>("Progresso").EntityType.HasKey(t => t.Id);
            builder.EntitySet<Avaliacao>("Avaliacao").EntityType.HasKey(t => t.Id);
            builder.EntitySet<UsuarioPrestador>("UsuarioPrestador").EntityType.HasKey(t => t.Id);
            builder.EntitySet<UsuarioContratante>("UsuarioContratante").EntityType.HasKey(t => t.Id);
        }
    }
}
