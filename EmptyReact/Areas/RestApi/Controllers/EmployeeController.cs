using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EmptyReact.Areas.RestApi.Models;

namespace EmptyReact.Areas.RestApi.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeeDbContext context;

        public EmployeeController(EmployeeDbContext context)
        {
            if (context.Employees.Count() == 0)
                for (int i = 0; i < 15; i++)
                    context.Employees.Add(new Employee()
                    {
                        Name = "Name " + (i + 1),
                        Email = "Email" + (i + 1),
                        Birthday = new DateTime(2000, 10, i + 1),
                        Salary = 50000 - i * 500,
                        LastModifiedDate = DateTime.Now.Date
                    });
            context.SaveChanges();
            this.context = context;
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int? id)
        {
            if (id == null)
                return new JsonResult(context.Employees.ToList());
            var employee = await context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null)
                return new JsonResult("Not found");
            return new JsonResult(employee);
        
        
        
        
        
        
        
        }

        [HttpPost]
        public async Task<JsonResult> Add([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
                return new JsonResult("Employee data is not valid");
            if (emp.Id == default)
                emp.Id = context.Employees.Count() + 1;
            context.Employees.Add(emp);
            await context.SaveChangesAsync();
            return new JsonResult("Added successfully!");
        }

        [HttpDelete("{id}")]
        public async Task<JsonResult> Remove(int id)
        {
            var emp = await context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (emp == null)
                return new JsonResult("There is no employee with such id");
            context.Employees.Remove(emp);
            await context.SaveChangesAsync();
            return new JsonResult("Deleted successfully");
        }

        [HttpPut]
        public async Task<JsonResult> Edit([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
                return new JsonResult(emp);
            context.Employees.Update(emp);
            await context.SaveChangesAsync();
            return new JsonResult("Edited successfully");
        }
    }
}
