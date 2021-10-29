using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EmptyReact.Areas.RestApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace EmptyReact.Areas.RestApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = "admin, user")]
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
            emp.LastModifiedDate = emp.LastModifiedDate.ToUniversalTime();
            context.Employees.Add(emp);
            await context.SaveChangesAsync();
            return new StatusCodeResult(200);
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            var emp = context.Employees.FirstOrDefault(e => e.Id == id);
            if (emp == null)
                return new StatusCodeResult(400);
            context.Employees.Remove(emp);
            context.SaveChanges();
            return new StatusCodeResult(200);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
                return new StatusCodeResult(400);
            emp.LastModifiedDate = emp.LastModifiedDate.ToUniversalTime();
            context.Employees.Update(emp);
            await context.SaveChangesAsync();
            return new StatusCodeResult(200);
        }
    }
}
