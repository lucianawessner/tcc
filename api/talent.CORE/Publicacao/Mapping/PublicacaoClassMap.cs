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
    public class PublicacaoClassMap : IEntityTypeConfiguration<Publicacao>
    {
        public void Configure(EntityTypeBuilder<Publicacao> builder)
        {
            builder.ToTable("Publicacao", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.Texto)
               .HasColumnName("Texto")
               .IsRequired();

            builder.Property(x => x.IdArquivo)
               .HasColumnName("IdArquivo");

            builder.Property(x => x.QuantidadeCurtida)
               .HasColumnName("QuantidadeCurtida")
               .IsRequired();

            builder.Property(x => x.IdUsuario)
               .HasColumnName("IdUsuario")
               .IsRequired();


          builder.HasOne(x => x.Arquivos)
              .WithMany(x => x.Publicacao)
              .HasForeignKey(x => x.IdArquivo);

          builder.HasOne(x => x.UsuarioPrestador)
              .WithMany(x => x.Publicacao)
              .HasForeignKey(x => x.IdUsuario);


        }
    }
}
