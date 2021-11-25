using Microsoft.EntityFrameworkCore;

namespace ModelsLibrary.RestApi
{
    public class EmployeeDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {
            Database.EnsureCreated();

            //if (Employees.Count() < 60)
            //    for (int i = Employees.Count(); i < 60; i++)
            //    {
            //        Employees.Add(new Employee
            //        {
            //            Name = "Name " + (i + 1),
            //            Birthday = new DateTime(2000, 10, (i + 1) % 29 + 1),
            //            Salary = 50000 - 500 * i,
            //            Email = $"email{(i + 1)}@email.mail"
            //        });
            //    }
            //SaveChanges();
        }
    }
}
