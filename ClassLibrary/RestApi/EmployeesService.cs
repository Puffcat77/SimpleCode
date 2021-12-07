using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelsLibrary.RestApi
{
    public class EmployeesService
    {
        private EmployeeDbContext context;
        public List<Employee> Employees
        {
            get
            {
                return context.Employees.ToList();
            }
        }

        public EmployeesService(EmployeeDbContext context)
        {
            this.context = context;
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return await context.Employees.FirstOrDefaultAsync(empl => empl.Id == id);
        }

        public List<Employee> GetOrderedEmployees(int limit,
            int page,
            string orderProp,
            string order)
        {
            return OrderEmployees(orderProp, order)
                .Skip(limit * (page - 1))
                .Take(limit)
                .ToList();
        }

        public async Task<int> CountTotalEmployeesPages(int limit)
        {
            if (limit == 0)
                return 1;
            int totalEmployeesCount = await context.Employees.CountAsync();
            int pagesCount = (int)Math.Ceiling((double)totalEmployeesCount / limit);
            return pagesCount;
        }

        private IQueryable<Employee> OrderEmployees(string prop, string order)
        {
            if (string.IsNullOrWhiteSpace(order) || string.IsNullOrWhiteSpace(prop))
                return context.Employees;
            if (order.ToLower().Contains("asc"))
                return context.Employees.OrderBy(employee => employee[prop]);
            if (order.ToLower().Contains("desc"))
                return context.Employees.OrderByDescending(employee => employee[prop]);
            return context.Employees;
        }

        public async void AddEmployee(Employee emp)
        {
            await context.Employees.AddAsync(emp);
            await context.SaveChangesAsync();
        }

        public async void RemoveEmployee(Employee emp)
        {
            context.Employees.Remove(emp);
            await context.SaveChangesAsync();
        }

        public async void UpdateEmployee(Employee emp)
        {
            context.Employees.Update(emp);
            await context.SaveChangesAsync();
        }
    }
}
