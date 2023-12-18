using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iceCreamWenApi.Models
{
    public class OrderModel
    {
        public int UserID { get; set; }

        public string UserName { get; set; }
        public string Useremail { get; set; }

        public string UserAddress { get; set; }

        public string UserContact { get; set; }

        public List<ProductModel> products { get; set; }

        public int SubTotal { get; set; }

        public int grandTotal { get; set; }

        public DateTime OrderDate { get; set; }
        public string order_Status { get; set; }
    }

    public class ProductModel
    {
        public string productName { get; set; }
        public int productPrice { get; set; }
        public int quantity { get; set; }
        public int itemTotal { get; set; }
        public int userID { get; set; }

        public DateTime OrderDate { get; set; }
    }


 
}
