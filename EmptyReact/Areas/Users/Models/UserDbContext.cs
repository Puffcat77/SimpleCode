﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmptyReact.Areas.Users.Models
{
    public class UserDbContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
            Database.EnsureCreated();
            var adminRole = new Role { Name = "admin" };
            if (Roles.FirstOrDefault(r => r.Name.Equals("admin")) == null)
                Roles.Add(adminRole);
            if (Users.FirstOrDefault(u => u.Login.Equals("admin") && u.Password.Equals("admin")) == null)    
            {
                Users.Add(new User { Login = "admin", Password = "admin", UserRole = adminRole });
            }
            SaveChanges();
        }
    }
}