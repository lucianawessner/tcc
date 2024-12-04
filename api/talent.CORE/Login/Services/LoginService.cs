using Microsoft.EntityFrameworkCore;
using talent.DOMAIN.Enums;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;
using talent.INFRA.Base.Core.Services;

namespace talent.CORE.Services 
{
    public class LoginService : BaseService<UsuarioDto, ILoginRepository>, ILoginService 
    {
        private readonly IUsuarioContratanteService _usuarioContratanteService;
        private readonly IUsuarioPrestadorService _usuarioPrestadorService;

        public LoginService(
            ILoginRepository repository, 
            IUsuarioContratanteService usuarioContratanteService,
            IUsuarioPrestadorService usuarioPrestadorService) : base(repository) 
         {
            _usuarioContratanteService = usuarioContratanteService;
            _usuarioPrestadorService = usuarioPrestadorService;
        }

        public async Task<Response<UsuarioDto>> Login(LoginDto dto) 
        {
            var contratante = await _usuarioContratanteService.GetAllNoTracking()
                .Where(dados => dados.Usuario == dto.Usuario)
                .Where(dados => dados.Senha == dto.Senha)
                .FirstOrDefaultAsync();

            var prestador = await _usuarioPrestadorService.GetAllNoTracking()
                .Where(dados => dados.Usuario == dto.Usuario)
                .Where(dados => dados.Senha == dto.Senha)
                .FirstOrDefaultAsync();

            if (contratante is null && prestador is null) 
            {
                return new Response<UsuarioDto>(null, 500, "Usu�rio ou senha incorretos");
            }

            var usuarioDto = new UsuarioDto();

            if (contratante is not null) 
            {
                usuarioDto = PreencherDadosUsuario(contratante.Id, contratante.Usuario, contratante.Nome, contratante.Email, ETipoUsuario.Contratante);
            }
            
            if (prestador is not null) 
            {
                usuarioDto = PreencherDadosUsuario(prestador.Id, prestador.Usuario, prestador.Nome, prestador.Email, ETipoUsuario.Prestador);
            }

            return new Response<UsuarioDto>(usuarioDto, 201, "Login realizado com sucesso");           
        }

        private UsuarioDto PreencherDadosUsuario(int id, string usuario, string nome, string email, ETipoUsuario tipoUsuario)
        {
            return new UsuarioDto 
            {
                Id = id,
                Usuario = usuario,
                Nome = nome,
                Email = email,
                TipoUsuario = tipoUsuario
            };
        }
    }

}