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
    public class FormularioClassMap : IEntityTypeConfiguration<Formulario>
    {
        public void Configure(EntityTypeBuilder<Formulario> builder)
        {
            builder.ToTable("Formulario", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.IdUsuario)
               .HasColumnName("IdUsuario")
               .IsRequired();

            builder.Property(x => x.IdServico)
               .HasColumnName("IdServico")
               .IsRequired();


          builder.HasOne(x => x.UsuarioPrestador)
              .WithMany(x => x.Formulario)
              .HasForeignKey(x => x.IdUsuario);

          builder.HasOne(x => x.Servico)
              .WithMany(x => x.Formulario)
              .HasForeignKey(x => x.IdServico);


          builder.HasMany(x => x.Progresso)
              .WithOne(x => x.Formulario)
              .HasForeignKey(x => x.IdFormulario);

                        }
    }
}
