using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using talent.DOMAIN.Models;

namespace talent.CORE.Mapping
{
    public class VagaClassMap : IEntityTypeConfiguration<Vaga>
    {
        public void Configure(EntityTypeBuilder<Vaga> builder)
        {
            builder.ToTable("Vaga", "dbo");

            builder.HasKey(x => new { x.Id });

            builder.Property(x => x.Cargo)
               .HasColumnName("Cargo")
               .IsRequired();

            builder.Property(x => x.Localizacao)
               .HasColumnName("Localizacao")
               .IsRequired();

            builder.Property(x => x.Remuneracao)
               .HasColumnName("Remuneracao")
               .IsRequired();

            builder.Property(x => x.Descricao)
               .HasColumnName("Descricao")
               .IsRequired();

            builder.Property(x => x.Requisitos)
               .HasColumnName("Requisitos");

            builder.Property(x => x.Prazo)
               .HasColumnName("Prazo")
               .IsRequired();

            builder.Property(x => x.Criacao)
               .HasColumnName("Criacao")
               .IsRequired();

            builder.Property(x => x.IdUsuarioContratante)
               .HasColumnName("IdUsuarioContratante")
               .IsRequired();

            builder.Property(x => x.Fechamento)
               .HasColumnName("Fechamento");

            builder.HasOne(x => x.UsuarioContratante)
                .WithMany(x => x.Vaga)
                .HasForeignKey(x => x.IdUsuarioContratante);

            builder.HasMany(x => x.FormularioPrestador)
                .WithOne(x => x.Vaga)
                .HasForeignKey(x => x.IdVaga);
        }
    }
}
