using Microsoft.AspNetCore.Http;

namespace talent.DOMAIN.Models;
public class FeedDto
{
    public string Usuario { get; set; }
    public string Texto { get; set; }
    public IFormFile? Foto { get; set; }  // Foto pode ser nula
}