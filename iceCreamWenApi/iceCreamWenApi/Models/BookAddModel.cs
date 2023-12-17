namespace iceCreamWenApi.Models
{
    public class BookAddModel
    {
        public IFormFile bookImageFile { get; set; }
        public string bookName { get; set; }
        public string description { get; set; }
        public string rating { get; set; }
        public string status { get; set; }
        public int price { get; set; }
        public string Author { get; set; }
    }
}
