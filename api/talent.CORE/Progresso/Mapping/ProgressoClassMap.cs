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
    public class ProgressoClassMap : IEntityTypeConfiguration<Progresso>
    {
        public void Configure(EntityTypeBuilder<Progresso> builder)
        {
            builder.ToTable("Progresso", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.Visualizado)
               .HasColumnName("Visualizado")
               .IsRequired();

            builder.Property(x => x.Aceito)
               .HasColumnName("Aceito")
               .IsRequired();

            builder.Property(x => x.Contato)
               .HasColumnName("Contato")
               .IsRequired();

            builder.Property(x => x.IdFormularioPrestador)
               .HasColumnName("IdFormularioPrestador")
               .IsRequired();


          builder.HasOne(x => x.FormularioPrestador)
              .WithMany(x => x.Progresso)
              .HasForeignKey(x => x.IdFormularioPrestador);


        }
    }
}
