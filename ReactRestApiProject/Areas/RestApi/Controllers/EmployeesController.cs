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
        private readonly EmployeesModel employeesModel;

        public EmployeesController(EmployeeDbContext context)
        {
            employeesModel = new EmployeesModel(context);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var employee = employeesModel.Employees.FirstOrDefault(e => e.Id == id);
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
            var employees = employeesModel.GetOrderedEmployees(limit, page, orderProp, order);
            
            return new JsonResult(new
            {
                employees,
                pages = employeesModel.CountTotalEmployeesPages(limit)
            });
        }

        [HttpPost]
        public IActionResult Add([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
                return new StatusCodeResult(400);
            emp.LastModifiedDate = emp.LastModifiedDate.ToUniversalTime();
            employeesModel.AddEmployee(emp);
            return new StatusCodeResult(200);
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(int id)
        {
            var emp = employeesModel.Employees.FirstOrDefault(e => e.Id == id);
            if (emp == null)
                return new StatusCodeResult(400);
            employeesModel.RemoveEmployee(emp);
            return new StatusCodeResult(200);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] Employee emp)
        {
            if (!ModelState.IsValid)
                return new StatusCodeResult(400);
            emp.LastModifiedDate = emp.LastModifiedDate.ToUniversalTime();
            employeesModel.UpdateEmployee(emp);
            return new StatusCodeResult(200);
        }
    }
}
