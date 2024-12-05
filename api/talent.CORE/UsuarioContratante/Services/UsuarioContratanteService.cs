using talent.INFRA.Base.Core.Services;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.DOMAIN.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using talent.DOMAIN.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace talent.CORE.Services
{
    public class UsuarioContratanteService : BaseService<UsuarioContratante, IUsuarioContratanteRepository>, IUsuarioContratanteService
    {
        private readonly string _diretorioFotos = Path.Combine(@"C:\Dev\pi\ui\src\assets");

        private readonly IUsuarioContratanteRepository repository;

        public UsuarioContratanteService(IUsuarioContratanteRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        public async Task<Response<UsuarioContratante>> Atualizar(int id, UsuarioDocumentoDto dto)
        {
            var usuario = await GetAll()
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

            if (usuario is null)
            {
                throw new ArgumentException("Usuário não encontrado na base de dados.");
            }

            usuario.Usuario = string.IsNullOrEmpty(dto.Usuario) ? usuario.Usuario : dto.Usuario;
            usuario.Cargo = string.IsNullOrEmpty(dto.Cargo) ? usuario.Cargo : dto.Cargo;
            usuario.DataNascimento = dto.DataNascimento ?? usuario.DataNascimento;
            usuario.Email = string.IsNullOrEmpty(dto.Email) ? usuario.Email : dto.Email;
            usuario.Experiencia = dto.Experiencia == string.Empty ? usuario.Experiencia : dto.Experiencia;
            usuario.Descricao = dto.Descricao == string.Empty ? usuario.Descricao : dto.Descricao;
            usuario.Localizacao = string.IsNullOrEmpty(dto.Localizacao) ? usuario.Localizacao : dto.Localizacao;
            usuario.Nome = string.IsNullOrEmpty(dto.Nome) ? usuario.Nome : dto.Nome;

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

                return new Response<UsuarioContratante>(usuario, 201, "Publicação feita com sucesso, com foto");
            }

            repository.Update(usuario);
            await repository.Context.SaveChangesAsync();

            return new Response<UsuarioContratante>(usuario, 201, "Publicação feita com sucesso, sem foto");
        }

        public async Task<Response<UsuarioContratante>> Criar(UsuarioDocumentoDto dto)
        {
            var usuario = new UsuarioContratante();
            usuario.Usuario = dto.Usuario;
            usuario.Cargo = dto.Cargo;
            usuario.DataNascimento = dto.DataNascimento;
            usuario.Email = dto.Email;
            usuario.Experiencia = dto.Experiencia;
            usuario.Localizacao = dto.Localizacao;
            usuario.Descricao = dto.Descricao;
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

                return new Response<UsuarioContratante>(usuario, 201, "Publicação feita com sucesso, com foto");
            }

            repository.Add(usuario);
            await repository.Context.SaveChangesAsync();

            return new Response<UsuarioContratante>(usuario, 201, "Publicação feita com sucesso, sem foto");
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