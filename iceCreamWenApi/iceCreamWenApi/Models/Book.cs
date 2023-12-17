using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iceCreamWenApi.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int bookid { get; set; }
        public string bookImgaeName { get; set; }
        [Required]
        public byte[] bookImageData { get; set; }
        [Required]
        public string bookName { get; set; }
        [Required]
        public string description { get; set; }
        [Required]
        public string rating { get; set; }
        [Required]
        public string status { get; set; }
        [Required]
        public int price { get; set; }
        [Required]
        public string author { get; set; }

    }
}
