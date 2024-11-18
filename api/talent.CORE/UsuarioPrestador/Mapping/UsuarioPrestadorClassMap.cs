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

            builder.Property(x => x.Experiencia)
               .HasColumnName("Experiencia");

            builder.Property(x => x.Localizacao)
               .HasColumnName("Localizacao");

            builder.Property(x => x.IdDocumento)
               .HasColumnName("IdDocumento");

            builder.Property(x => x.Email)
               .HasColumnName("Email")
               .IsRequired();

            builder.Property(x => x.DataNascimento)
               .HasColumnName("DataNascimento");


          builder.HasOne(x => x.Documento)
              .WithMany(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdDocumento);


          builder.HasMany(x => x.FormularioPrestador)
              .WithOne(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdUsuarioPrestador);

                          builder.HasMany(x => x.Feed)
              .WithOne(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdUsuarioPrestador);

                          builder.HasMany(x => x.Avaliacao)
              .WithOne(x => x.UsuarioPrestador)
              .HasForeignKey(x => x.IdPrestador);

                        }
    }
}
