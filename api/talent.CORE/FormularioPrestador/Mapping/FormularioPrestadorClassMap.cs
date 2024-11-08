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
    public class FormularioPrestadorClassMap : IEntityTypeConfiguration<FormularioPrestador>
    {
        public void Configure(EntityTypeBuilder<FormularioPrestador> builder)
        {
            builder.ToTable("FormularioPrestador", "dbo");

            builder.HasKey(x => new {x.Id});

            builder.Property(x => x.IdUsuarioPrestador)
               .HasColumnName("IdUsuarioPrestador")
               .IsRequired();

            builder.Property(x => x.IdVaga)
               .HasColumnName("IdVaga")
               .IsRequired();


          builder.HasOne(x => x.UsuarioPrestador)
              .WithMany(x => x.FormularioPrestador)
              .HasForeignKey(x => x.IdUsuarioPrestador);

          builder.HasOne(x => x.Vaga)
              .WithMany(x => x.FormularioPrestador)
              .HasForeignKey(x => x.IdVaga);


          builder.HasMany(x => x.Progresso)
              .WithOne(x => x.FormularioPrestador)
              .HasForeignKey(x => x.IdFormularioPrestador);

                        }
    }
}
