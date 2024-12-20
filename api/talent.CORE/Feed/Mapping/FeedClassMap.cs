using talent.DOMAIN.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace talent.CORE.Mapping
{
    public class FeedClassMap : IEntityTypeConfiguration<Feed>
    {
        public void Configure(EntityTypeBuilder<Feed> builder)
        {
            builder.ToTable("Feed", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.Texto)
               .HasColumnName("Texto")
               .IsRequired();

            builder.Property(x => x.IdDocumento)
               .HasColumnName("IdDocumento");

            builder.Property(x => x.QuantidadeCurtida)
               .HasColumnName("QuantidadeCurtida")
               .IsRequired();

            builder.Property(x => x.DataCriacao)
               .HasColumnName("DataCriacao")
               .IsRequired(false);

            builder.Property(x => x.IdUsuarioPrestador)
               .HasColumnName("IdUsuarioPrestador")
               .IsRequired();           

          builder.HasOne(x => x.Documento)
              .WithMany(x => x.Feed)
              .HasForeignKey(x => x.IdDocumento);

          builder.HasOne(x => x.UsuarioPrestador)
              .WithMany(x => x.Feed)
              .HasForeignKey(x => x.IdUsuarioPrestador);
        }
    }
}
