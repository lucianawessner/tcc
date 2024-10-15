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
    public class UsuarioPrestadorClassMap : IEntityTypeConfiguration<UsuarioPrestador>
    {
        public void Configure(EntityTypeBuilder<UsuarioPrestador> builder)
        {
            builder.ToTable("UsuarioPrestador", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.Usuario)
               .HasColumnName("Usuario")
               .IsRequired();

            builder.Property(x => x.Senha)
               .HasColumnName("Senha")
               .IsRequired();

            builder.Property(x => x.Descricao)
               .HasColumnName("Descricao");

            builder.Property(x => x.Cargo)
               .HasColumnName("Cargo");

            builder.Property(x => x.Qualificacao)
               .HasColumnName("Qualificacao");

            builder.Property(x => x.Localizacao)
               .HasColumnName("Localizacao");

            builder.Property(x => x.IdArquivo)
               .HasColumnName("IdArquivo");

            builder.Property(x => x.Email)
               .HasColumnName("Email")
               .IsRequired();


          builder.HasOne(x => x.Arquivos)
              .WithMany(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdArquivo);


          builder.HasMany(x => x.Publicacao)
              .WithOne(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdUsuario);

                          builder.HasMany(x => x.Avaliacao)
              .WithOne(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdPrestador);

                          builder.HasMany(x => x.Formulario)
              .WithOne(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdUsuario);

                        }
    }
}
