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
    public class UsuarioContratanteClassMap : IEntityTypeConfiguration<UsuarioContratante>
    {
        public void Configure(EntityTypeBuilder<UsuarioContratante> builder)
        {
            builder.ToTable("UsuarioContratante", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.Usuario)
               .HasColumnName("Usuario")
               .IsRequired();

            builder.Property(x => x.Senha)
               .HasColumnName("Senha")
               .IsRequired();

            builder.Property(x => x.Descricao)
               .HasColumnName("Descricao");

            builder.Property(x => x.Localizacao)
               .HasColumnName("Localizacao");

            builder.Property(x => x.Area)
               .HasColumnName("Area");

            builder.Property(x => x.IdArquivo)
               .HasColumnName("IdArquivo");

            builder.Property(x => x.Email)
               .HasColumnName("Email");


          builder.HasOne(x => x.Arquivos)
              .WithMany(x => x.UsuarioContratante)
              .HasForeignKey(x => x.IdArquivo);


          builder.HasMany(x => x.Servico)
              .WithOne(x => x.UsuarioContratante)
              .HasForeignKey(x => x.IdUsuario);

                          builder.HasMany(x => x.Avaliacao)
              .WithOne(x => x.UsuarioContratante)
              .HasForeignKey(x => x.IdContratante);

                        }
    }
}
