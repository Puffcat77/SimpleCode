using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmptyReact.Areas.RestApi.Models
{
    public class Employee
    {
        // Employee props: name, email, birthday, salary, lastmodifieddate
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required, MaxLength(30)]
        public string Name { get; set; }

        [Required, MaxLength(30), DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        
        [Required, DataType(DataType.Date)]
        public DateTime Birthday { get; set; }
        
        [Required]
        public decimal Salary { get; set; }
        
        [Required, DataType(DataType.Date)]
        public DateTime LastModifiedDate { get; set; }
    }
}
