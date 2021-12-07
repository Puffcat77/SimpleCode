using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModelsLibrary.Authorization
{
    public class UserService
    {
        private UserDbContext context;
        private List<User> Users 
        { 
            get 
            {
                return context.Users.Include(u => u.UserRole).ToListAsync().Result;
            }
        }
        public UserService(UserDbContext context)
        {
            this.context = context;
        }

        public User GetUser(string login, string password) => 
            Users.FirstOrDefault(u => u.Login.Equals(login) && u.Password.Equals(password));
    }
}
