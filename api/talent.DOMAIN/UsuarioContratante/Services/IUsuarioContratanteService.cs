using talent.DOMAIN.Models;
using talent.INFRA.Base.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using talent.DOMAIN.Dto;

namespace talent.DOMAIN.Services
{
    public interface IUsuarioContratanteService : IBaseService<UsuarioContratante>
    {
        Task<Response<UsuarioContratante>> Atualizar(int id, UsuarioDocumentoDto dto);
        Task<Response<UsuarioContratante>> Criar(UsuarioDocumentoDto dto);
    }
}
