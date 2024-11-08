using talent.CORE.DataAccess;
using talent.DOMAIN.Models;
using talent.DOMAIN.Repositories;
using talent.INFRA.Base.Core.Repositories;

namespace talent.CORE.Repositories {
    public class LoginRepository : BaseRepository<UsuarioDto, TalentTrialDbContext>, ILoginRepository {
        public LoginRepository(TalentTrialDbContext context)
            : base(context) {
        }
    }
}
