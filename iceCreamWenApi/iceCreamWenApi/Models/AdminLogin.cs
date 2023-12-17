using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;

namespace iceCreamWenApi.Models
{
    public class AdminLogin
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid adminid { get; set; }
        [Required]
        public string adminemail { get; set; }
        [Required]
        public string adminpassword { get; set; }

    }
}
