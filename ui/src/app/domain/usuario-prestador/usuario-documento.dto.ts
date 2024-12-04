export class UsuarioDocumentoDto {
    Id: number = 0;
    Usuario: string = '';
    Nome: string = '';
    Email: string = '';
    Descricao: string = '';
    Localizacao: string = '';
    Cargo: string = '';
    Experiencia: string = '';
    DataNascimento?: Date | null;
    DataCriacao?: Date | null;
    Foto?: File | null; 
}
