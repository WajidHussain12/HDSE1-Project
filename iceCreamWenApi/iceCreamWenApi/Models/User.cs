using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iceCreamWenApi.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userid { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string userName { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string address { get; set; }
        [Required]
        public string contact { get; set; }
        [Required]
        public string gender { get; set; }
        [Required]
        public string type { get; set; }
        [Required]
        public string status { get; set; }

    }
}
