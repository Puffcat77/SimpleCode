using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ModelsLibrary.RestApi
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

        public IComparable this[string propName]
        {
            get
            {
                //using reflection
                //foreach (var prop in GetType().GetProperties())
                //    if (nameof(prop).ToLower().Equals(propName.ToLower()))
                //        return (IComparable)prop.GetValue(this);
                //return Id;
                return propName switch
                {
                    "Name" => Name,
                    "Email" => Email,
                    "Birthday" => Birthday,
                    "Salary" => Salary,
                    _ => Id,
                };
            }
        }
    }
}
