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

        public string custome_Name { get; set; }
        [Required]

        public DateTime order_Date { get; set; }
        [Required]

        public string products { get; set; }
        [Required]

        public long total_Amount { get; set; }
        [Required]

        public string shipping_Adddress { get; set; }
        [Required]

        public string order_Status { get; set; }
    }
}
