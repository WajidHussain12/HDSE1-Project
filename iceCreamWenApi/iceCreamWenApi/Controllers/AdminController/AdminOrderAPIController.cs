using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminOrderAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AdminOrderAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{oid},{cid}")]
        public async Task<ActionResult> GetOrderProducts(int oid, int cid)
        {

           var products = await _context.products.Where(x => x.orderid == oid && x.userID == cid).ToListAsync();
            if(products == null)
            {
                return NotFound();
            }

            else{
                return Ok(products);
            }
        }


        [HttpGet]
        public async Task<ActionResult> GetOrders()
        {
            var orders = await _context.orders.ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return NotFound("No orders found");
            }

            //var orderList = new List<object>();

            //foreach (var order in orders)
            //{
            //    var orderData = new
            //    {
            //        OrderID = order.orderid, // Assuming there's an OrderID property in your Order entity
            //        UserID = order.customer_ID,
            //        UserName = order.customer_Name,
            //        Useremail = order.customer_email,
            //        UserAddress = order.shipping_Adddress,
            //        UserContact = order.UserContact,
            //        SubTotal = order.SubTotal,
            //        GrandTotal = order.GrandTotal,
            //        OrderDate = order.OrderDate,
            //        OrderStatus = order.order_Status,
            //        Products = order.Products.Select(p => new
            //        {
            //            ProductName = p.productName,
            //            ProductPrice = p.productPrice,
            //            Quantity = p.quantity,
            //            ItemTotal = p.itemTotal,
            //            UserID = p.userID,
            //            OrderDate = p.OrderDate
            //        }).ToList()
            //    };

            //    orderList.Add(orderData);
            //}

            return Ok(orders);
        }



    }
}
