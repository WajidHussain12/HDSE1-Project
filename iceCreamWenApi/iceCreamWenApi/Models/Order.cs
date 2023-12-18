using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iceCreamWenApi.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int orderid { get; set; }
        [Required]
        public int customer_ID { get; set; }
        [Required]

        public string customer_Name { get; set; }
        [Required]
        public string customer_email { get; set; }
        [Required]
        public string shipping_Adddress { get; set; }
        [Required]

        public string UserContact { get; set; }
        [Required]

        public List<Product> Products { get; set; }
        [Required]

        public long SubTotal { get; set; }
        [Required]

        public long GrandTotal { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public string order_Status { get; set; }
    }
}
