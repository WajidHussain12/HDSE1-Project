using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace iceCreamWenApi.Models
{
    public class Recipe
    {
        internal object recipelist;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int recipeid { get; set; }
        [Required]
        public string flavorName { get; set; }
        [Required]
        public string instructions { get; set; }
        [Required]
        public string ingredients { get; set; }
        [Required]
        public string cookingTime { get; set; }
        [Required]
        public string calories { get; set; }
        [Required]
        public string rating { get; set; }
        [Required]
        public string status { get; set; }
        [Required]
        public string authorId { get; set; }
        [Required]
        public string authorName { get; set; }


        //File Handling
        public string recipeImageFileName { get; set; }
        public string recipeBannerImageFileName { get; set; }
        public string recipeFlavourImageFileName { get; set; }

        public byte[] fileData { get; set; }
        public byte[] fileDataBannerImage { get; set; }
        public byte[] fileDataFlavourImage { get; set; }



        // Noman Work
        //public int varietyid { get; set; }

        //public Varieties varieties {  get; set; }


        public List<Varieties> Varieties { get; set; }
    }
}
