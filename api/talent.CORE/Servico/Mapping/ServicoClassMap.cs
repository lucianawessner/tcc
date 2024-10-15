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
    public class ServicoClassMap : IEntityTypeConfiguration<Servico>
    {
        public void Configure(EntityTypeBuilder<Servico> builder)
        {
            builder.ToTable("Servico", "dbo");

            builder.HasKey(x => new {x.Id});

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

            builder.Property(x => x.IdUsuario)
               .HasColumnName("IdUsuario")
               .IsRequired();

            builder.Property(x => x.Fechamento)
               .HasColumnName("Fechamento");


          builder.HasOne(x => x.UsuarioContratante)
              .WithMany(x => x.Servico)
              .HasForeignKey(x => x.IdUsuario);


          builder.HasMany(x => x.Formulario)
              .WithOne(x => x.Servico)
              .HasForeignKey(x => x.IdServico);

                        }
    }
}
