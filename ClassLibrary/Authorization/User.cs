using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClassLibrary.Authorization
{
    public class User
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(100)]
        public string Login { get; set; }
        [MaxLength(100)]
        public string Password { get; set; }

        public int UserRoleId { get; set; }
        public Role UserRole { get; set; }
    }
}
