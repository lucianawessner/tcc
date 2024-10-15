using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.INFRA.Base.Services
{
    public interface IBaseService<T>
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetAllNoTracking();
        Task<T> AddAsync(T obj);
        Task<T> UpdateAsync(T obj);
        Task<T> DeleteAsync(T obj);
    }
}
