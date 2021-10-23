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
    public class EmployeesController : Controller
    {
        private readonly EmployeeDbContext context;

        public EmployeesController(EmployeeDbContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(int id)
        {
            var employee = await context.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null)
                return new JsonResult("Not found");
            return new JsonResult(employee);
        }

        [HttpGet]
        public JsonResult GetAll()
        {
            return new JsonResult(context.Employees.ToList());
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
            {
                var allErrors = ModelState.Values.SelectMany(v => v.Errors);
                foreach (var error in allErrors)
                {
                    Console.WriteLine(error.ErrorMessage);
                    Console.WriteLine(error.Exception);
                }
                return new StatusCodeResult(400);
            }
            
            emp.LastModifiedDate = DateTime.Now;
            context.Employees.Add(emp);
            await context.SaveChangesAsync();
            return new StatusCodeResult(200);
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
