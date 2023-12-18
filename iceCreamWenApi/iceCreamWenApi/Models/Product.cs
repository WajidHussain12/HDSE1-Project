using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace iceCreamWenApi.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Productid { get; set; }
        [Required]
        public int orderid { get; set; }
        // Navigation property for the relationship
        public Order Order { get; set; }
        [Required]
        public int userID { get; set; }

        [Required]
        public string productName { get; set; }

        [Required]
        public int productPrice { get; set; }

        [Required]
        public int quantity { get; set; }

        [Required]
        public int itemTotal { get; set; }

        //[ForeignKey("OrderId")]
        //public Order Order { get; set; }
       
        [Required]
        public DateTime OrderDate { get; set; }
    }
}
