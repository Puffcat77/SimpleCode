using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModelsLibrary.RestApi
{
    public class EmployeesModel
    {
        private EmployeeDbContext context;
        public List<Employee> Employees
        {
            get
            {
                return context.Employees.ToList();
            }
        }

        public EmployeesModel(EmployeeDbContext context)
        {
            this.context = context;
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

        public int CountTotalEmployeesPages(int limit)
        {
            if (limit == 0)
                return 1;
            int totalEmployeesCount = context.Employees.Count();
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

        public void AddEmployee(Employee emp)
        {
            context.Employees.Add(emp);
            context.SaveChanges();
        }

        public void RemoveEmployee(Employee emp)
        {
            context.Employees.Remove(emp);
            context.SaveChanges();
        }

        public void UpdateEmployee(Employee emp)
        {
            context.Employees.Update(emp);
            context.SaveChanges();
        }
    }
}
