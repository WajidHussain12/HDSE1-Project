using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace iceCreamWenApi.Models
{
    public class Varieties
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VarietyID { get; set; }
        [Required]
        public int RecipeID { get; set; }
        // Navigation property for the relationship
        public Recipe Recipe { get; set; }

        



        [Required]
        public byte[] varietyImg { get; set; }
        [Required]
        public string varietyName { get; set; }  
        [Required]
        public string deliveryTime { get; set; }
        [Required]
        public string cashOnDelivery { get; set; }
        [Required]
        public int price { get; set; }
        [Required]
        public string VarietyImageFileName { get; set; }

        //public List<Recipe> recipelist {  get; set; } 
    }
}
