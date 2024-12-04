using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using talent.DOMAIN.Dto;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;
using talent.INFRA.Base.Core.Services;

namespace talent.CORE.Services
{
    public class UsuarioPrestadorService : BaseService<UsuarioPrestador, IUsuarioPrestadorRepository>, IUsuarioPrestadorService
    {
        private readonly string _diretorioFotos = Path.Combine(@"C:\Dev\pi\tcc\ui\src\assets");

        private readonly IUsuarioPrestadorRepository repository;

        public UsuarioPrestadorService(IUsuarioPrestadorRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        public async Task<Response<UsuarioPrestador>> Atualizar(int id, UsuarioDocumentoDto dto)
        {
            var usuario = await GetAll()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

            if (usuario is null)
            {
                throw new ArgumentException("Usuário não encontrado na base de dados.");
            }

            usuario.Usuario = dto.Usuario ?? usuario.Usuario;
            usuario.Cargo = dto.Cargo ?? usuario.Cargo;
            usuario.DataNascimento = dto.DataNascimento ?? usuario.DataNascimento;
            usuario.Email = dto.Email ?? usuario.Email;
            usuario.Experiencia = dto.Experiencia ?? usuario.Experiencia;
            usuario.Localizacao = dto.Localizacao ?? usuario.Localizacao;
            usuario.Nome = dto.Nome ?? usuario.Nome;

            if (dto.Foto != null)
            {
                var documentoDto = await SalvarFoto(dto.Foto);

                var documento = new Documento
                {
                    Nome = documentoDto.Nome,
                    Tipo = documentoDto.Tipo,
                    Caminho = documentoDto.Caminho
                };

                usuario.Documento = documento;

                repository.Update(usuario);
                await repository.Context.SaveChangesAsync();

                return new Response<UsuarioPrestador>(usuario, 201, "Publicação feita com sucesso, com foto");
            }

            repository.Update(usuario);
            await repository.Context.SaveChangesAsync();

            return new Response<UsuarioPrestador>(usuario, 201, "Publicação feita com sucesso, sem foto");
        }

        public async Task<Response<UsuarioPrestador>> Criar(UsuarioDocumentoDto dto)
        {
            var usuario = new UsuarioPrestador();
            usuario.Usuario = dto.Usuario;
            usuario.Cargo = dto.Cargo;
            usuario.DataNascimento = dto.DataNascimento;
            usuario.Email = dto.Email;
            usuario.Experiencia = dto.Experiencia;
            usuario.Localizacao = dto.Localizacao;
            usuario.Nome = dto.Nome;
            usuario.Senha = dto.Senha;

            if (dto.Foto != null)
            {
                var documentoDto = await SalvarFoto(dto.Foto);

                var documento = new Documento
                {
                    Nome = documentoDto.Nome,
                    Tipo = documentoDto.Tipo,
                    Caminho = documentoDto.Caminho
                };

                usuario.Documento = documento;

                repository.Add(usuario);
                await repository.Context.SaveChangesAsync();

                return new Response<UsuarioPrestador>(usuario, 201, "Publicação feita com sucesso, com foto");
            }

            repository.Add(usuario);
            await repository.Context.SaveChangesAsync();

            return new Response<UsuarioPrestador>(usuario, 201, "Publicação feita com sucesso, sem foto");
        }

        private async Task<DocumentoDto> SalvarFoto(IFormFile foto)
        {
            var nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(foto.FileName);

            var caminhoCompleto = Path.Combine(_diretorioFotos, nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await foto.CopyToAsync(stream);
            }

            return new DocumentoDto
            {
                Caminho = caminhoCompleto,
                Nome = nomeArquivo,
                Tipo = foto.ContentType
            };
        }
    }
}