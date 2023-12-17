using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Dynamic;

namespace iceCreamWenApi.Controllers.UserController
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserBookAPIController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;

        public UserBookAPIController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllbooks()
        {
            try
            {
                var book = await _dbContext.books.ToListAsync();

                if (book != null && book.Any())
                {
                    // Create a list to accumulate recipe information
                    List<dynamic> allbookInfo = new List<dynamic>();

                    foreach (var bookinfo in book)
                    {
                        // Create a dynamic object to store recipe information
                        dynamic bookData = new ExpandoObject();

                        // Add recipe information to the dynamic object
                        bookData.bookid = bookinfo.bookid;
                        bookData.bookName = bookinfo.bookName;
                        bookData.description = bookinfo.description;
                        bookData.rating = bookinfo.rating;
                        bookData.status = bookinfo.status;
                        bookData.price = bookinfo.price;
                        bookData.author = bookinfo.author;
                        bookData.bookImgaeName = bookinfo.bookImgaeName;
                        // Add other properties as needed

                        if (bookinfo.bookImageData != null)
                        {
                            // Create an entry for the recipe file
                            bookData.File = new
                            {
                                FileName = bookinfo.bookImgaeName,
                                FileData = bookinfo.bookImageData // Assuming fileData is a byte array
                            };
                        }

                        // Add the dynamic object to the list
                        allbookInfo.Add(bookData);
                    }

                    // Serialize all recipe information to a JSON string
                    var allbookJson = JsonConvert.SerializeObject(allbookInfo);

                    return Ok(allbookJson);
                }

                return NotFound();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
