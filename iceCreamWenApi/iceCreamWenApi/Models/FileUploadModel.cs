namespace iceCreamWenApi.Models
{
    public class FileUploadModel
    {
        public IFormFile File { get; set; }
        public IFormFile FileRecipeBanner { get; set; }
        public IFormFile FileVarietyBanner { get; set; }
        //public Recipe Recipe { get; set; }
        public string flavorName { get; set; }
        public string cookingTime { get; set; }
        public string ingredients { get; set; }
        public string instructions { get; set; }
        public string calories { get; set; }
        public string authorId { get; set; }
        public string authorName { get; set; }
        public string status { get; set; }
        public string rating { get; set; }

    }
}
