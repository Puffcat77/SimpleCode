using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmptyReact.Areas.RestApi.Models
{
    public class EmployeeDbContext: DbContext
    { 
        public DbSet<Employee> Employees { get; set; }
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options): base(options)
        {
            Database.EnsureCreated();
        }
    }
}
