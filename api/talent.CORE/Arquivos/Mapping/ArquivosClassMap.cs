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
    public class ArquivosClassMap : IEntityTypeConfiguration<Arquivos>
    {
        public void Configure(EntityTypeBuilder<Arquivos> builder)
        {
            builder.ToTable("Arquivos", "dbo");

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



          builder.HasMany(x => x.UsuarioPrestador)
              .WithOne(x => x.Arquivos)
              .HasForeignKey(x => x.IdArquivo);

                          builder.HasMany(x => x.UsuarioContratante)
              .WithOne(x => x.Arquivos)
              .HasForeignKey(x => x.IdArquivo);

                          builder.HasMany(x => x.Publicacao)
              .WithOne(x => x.Arquivos)
              .HasForeignKey(x => x.IdArquivo);

                        }
    }
}
