using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace iceCreamWenApi.Models
{
    public class RecipeWinner
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int winnerRecipeid { get; set; }
        [Required]
        public int author_ID { get; set; }
        [Required]
        public string recipe_Name { get; set; }

        [Required]
        public string author_Name { get; set; }

        [Required]
        public string ingredients { get; set; }
        [Required]
        public string instructions { get; set; }
        [Required]
        public string cooking_Time { get; set; }

        [Required]
        public string calories { get; set; }
        
    }
}
