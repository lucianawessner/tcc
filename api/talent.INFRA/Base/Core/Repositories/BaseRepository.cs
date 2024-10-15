using talent.INFRA.Base.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace talent.INFRA.Base.Core.Repositories
{
    public class BaseRepository<T, TDbContext> : IBaseRepository<T>
        where T : class
        where TDbContext : DbContext
    {
        private DbSet<T> _dbSet;
        public DbSet<T> DbSet => _dbSet;
        public DbContext Context  {get; private set;}

        public BaseRepository(TDbContext context)
        {
            Context = context;
            _dbSet = context.Set<T>();
        }

        public void Add(T obj)
        {
            _dbSet.Add(obj);
        }

        public void Update(T obj)
        {
            _dbSet.Update(obj);
        }

        public void Delete(T obj)
        {
            _dbSet.Remove(obj);
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet;
        }

        public IQueryable<T> GetAllNoTracking()
        {
            return _dbSet.AsNoTracking();
        }
    }
}
