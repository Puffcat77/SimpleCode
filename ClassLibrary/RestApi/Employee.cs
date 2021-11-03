using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ClassLibrary.RestApi
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

        public IComparable this [string propName]
        {
            get 
            {
                switch (propName) 
                {
                    case "Name":
                        return Name;
                    case "Email":
                        return Email;
                    case "Birthday":
                        return Birthday;
                    case "Salary":
                        return Salary;
                    default:
                        return Id;
                } 
            }
        }
    }
}
