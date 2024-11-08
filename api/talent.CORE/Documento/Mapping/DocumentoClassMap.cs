using talent.DOMAIN.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.CORE.Mapping
{
    public class DocumentoClassMap : IEntityTypeConfiguration<Documento>
    {
        public void Configure(EntityTypeBuilder<Documento> builder)
        {
            builder.ToTable("Documento", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.Nome)
               .HasColumnName("Nome")
               .IsRequired();

            builder.Property(x => x.Tipo)
               .HasColumnName("Tipo")
               .IsRequired();

            builder.Property(x => x.Caminho)
               .HasColumnName("Caminho")
               .IsRequired();



          builder.HasMany(x => x.UsuarioContratante)
              .WithOne(x => x.Documento)
              .HasForeignKey(x => x.IdDocumento);

                          builder.HasMany(x => x.Feed)
              .WithOne(x => x.Documento)
              .HasForeignKey(x => x.IdDocumento);

                          builder.HasMany(x => x.UsuarioPrestador)
              .WithOne(x => x.Documento)
              .HasForeignKey(x => x.IdDocumento);

                        }
    }
}
