using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace iceCreamWenApi.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserOrderAPIController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserOrderAPIController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CreateOrder(OrderModel orderData)
        {
            var order = new Order
            {
                customer_ID = orderData.UserID,
                customer_Name = orderData.UserName,
                customer_email = orderData.Useremail,
                shipping_Adddress = orderData.UserAddress,
                UserContact = orderData.UserContact,
                SubTotal = orderData.SubTotal,
                GrandTotal = orderData.grandTotal,
                OrderDate = orderData.OrderDate,
                order_Status = orderData.order_Status,
            };

            List<Product> productList = new List<Product>();

            foreach (var productData in orderData.products)
            {
                var product = new Product
                {
                    productName = productData.productName,
                    productPrice = productData.productPrice,
                    quantity = productData.quantity,
                    itemTotal = productData.itemTotal,
                    userID = productData.userID,
                    OrderDate = productData.OrderDate,
                };
                productList.Add(product);
            }
            order.Products = productList;
            await _context.orders.AddAsync(order);
            await _context.products.AddRangeAsync(productList);
            _context.SaveChanges();

            return Ok(new
            {
                Message = "Order created successfully",
                OrderData = order,
                ProductData = productList
            });
        }
    }
}
