using System.ComponentModel.DataAnnotations;

namespace iceCreamWenApi.Models
{
    public class AdminLoginModel
    {
        public string adminemail { get; set; }
        public string adminpassword { get; set; }
    }
}
