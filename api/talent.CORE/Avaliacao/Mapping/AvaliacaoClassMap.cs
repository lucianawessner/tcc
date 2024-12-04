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
    public class AvaliacaoClassMap : IEntityTypeConfiguration<Avaliacao>
    {
        public void Configure(EntityTypeBuilder<Avaliacao> builder)
        {
            builder.ToTable("Avaliacao", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.Estrelas)
               .HasColumnName("Estrelas")
               .IsRequired();

            builder.Property(x => x.IdPrestador)
               .HasColumnName("IdPrestador");

            builder.Property(x => x.IdContratante)
               .HasColumnName("IdContratante");
            
            builder.Property(x => x.QuemAvaliou)
               .HasColumnName("QuemAvaliou")
               .IsRequired(false);

          builder.HasOne(x => x.UsuarioPrestador)
              .WithMany(x => x.Avaliacao)
              .HasForeignKey(x => x.IdPrestador);

          builder.HasOne(x => x.UsuarioContratante)
              .WithMany(x => x.Avaliacao)
              .HasForeignKey(x => x.IdContratante);


        }
    }
}
