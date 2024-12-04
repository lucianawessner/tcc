using talent.INFRA.Base.Services;
using talent.DOMAIN.Models;

namespace talent.DOMAIN.Services 
{
    public interface IFeedService : IBaseService<Feed>
    {
        Task<Response<Feed>> Curtir(int id);
        Task<Response<Feed>> Publicar(FeedDto dto);
    }
}
