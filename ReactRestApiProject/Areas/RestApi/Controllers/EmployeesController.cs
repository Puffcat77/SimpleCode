using ClassLibrary.RestApi;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactRestApiProject.Areas.RestApi.Controllers
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
        public JsonResult GetAll(int limit,
            int page,
            string orderProp,
            string order)
        {
            var orderedEmployees = OrderEmployees(orderProp, order);
            var result = orderedEmployees.Skip(limit * (page - 1)).Take(limit).ToList();
            return new JsonResult(new
            {
                employees = result,
                pages = limit == 0 ? 0
                : (int)Math.Ceiling((double)context.Employees.Count() / limit)
            });
        }

        private List<Employee> OrderEmployees(string prop, string order)
        {
            if (order == null || order == "" || prop == null || prop == "")
                return context.Employees.ToList();
            if (order.ToLower().Contains("asc"))
                return context.Employees.OrderBy(employee => employee[prop]).ToList();
            if (order.ToLower().Contains("desc"))
                return context.Employees.OrderByDescending(employee => employee[prop]).ToList();
            return context.Employees.ToList();

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
