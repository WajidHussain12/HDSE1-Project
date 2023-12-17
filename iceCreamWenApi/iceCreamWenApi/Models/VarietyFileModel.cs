using System.ComponentModel.DataAnnotations;

namespace iceCreamWenApi.Models
{
    public class VarietyFileModel
    {
        public IFormFile VarietyImageFile{ get; set; }
        public int RecipeID { get; set; }
        public string varietyName { get; set; }
        public string deliveryTime { get; set; }
        public string cashOnDelivery { get; set; }
        public int price { get; set; }
    }
}
