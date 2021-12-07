using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelsLibrary.RestApi;
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
        private readonly EmployeesService employeesService;

        public EmployeesController(EmployeeDbContext context)
        {
            employeesService = new EmployeesService(context);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var employee = await employeesService.GetEmployee(id);
            if (employee == null)
                return new StatusCodeResult(404);
            return new JsonResult(employee);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int limit,
            int page,
            string orderProp,
            string order)
        {
            return new JsonResult(new
            {
                employees = employeesService.GetOrderedEmployees(limit, page, orderProp, order),
                pages = await employeesService.CountTotalEmployeesPages(limit)
            });
        }

        [HttpPost]
        public IActionResult Add([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
                return new StatusCodeResult(400);
            emp.LastModifiedDate = emp.LastModifiedDate.ToUniversalTime();
            employeesService.AddEmployee(emp);
            return new StatusCodeResult(200);
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            var emp = employeesService.Employees.FirstOrDefault(e => e.Id == id);
            if (emp == null)
                return new StatusCodeResult(400);
            employeesService.RemoveEmployee(emp);
            return new StatusCodeResult(200);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
                return new StatusCodeResult(400);
            emp.LastModifiedDate = emp.LastModifiedDate.ToUniversalTime();
            employeesService.UpdateEmployee(emp);
            return new StatusCodeResult(200);
        }
    }
}
