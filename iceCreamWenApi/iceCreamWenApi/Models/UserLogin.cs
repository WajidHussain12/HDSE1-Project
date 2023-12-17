using System.ComponentModel.DataAnnotations;

namespace iceCreamWenApi.Models
{
    public class UserLogin
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}
