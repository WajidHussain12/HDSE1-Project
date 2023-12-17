using iceCreamWenApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace iceCreamWenApi.Controllers.AdminController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminBookAPIController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public AdminBookAPIController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> Getbook()
        {
            var data = await context.books.ToListAsync();
            return Ok(data);
        }


        [HttpPost]
        public async Task<IActionResult> Addbook([FromForm] BookAddModel book)
        {
            if (book.bookImageFile.Length > 0)
            {


                var bookdata = new Book()
                {
                    bookName = book.bookName,
                    description = book.description,
                    rating = book.rating,
                    status = book.status,
                    price = book.price,
                    author = book.Author,



                    bookImgaeName = book.bookImageFile.FileName
                    //recipeBannerImageFileName = model.FileRecipeBanner.FileName,
                    //recipeFlavourImageFileName = model.FileVarietyBanner.FileName,
                };

                using (var stream = new MemoryStream())
                {
                    book.bookImageFile.CopyTo(stream);
                    bookdata.bookImageData = stream.ToArray();
                }

                await this.context.books.AddAsync(bookdata);
                await context.SaveChangesAsync();
                return Ok(new
                {
                    Success="Book Added Successfully..."
                });

            }
            return BadRequest("No file or empty file provided");
        }

    }
}
