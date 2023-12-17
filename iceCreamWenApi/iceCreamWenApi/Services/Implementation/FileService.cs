using iceCreamWenApi.Models;
using iceCreamWenApi.Services.Interface;
using System.Security.Cryptography.X509Certificates;

namespace iceCreamWenApi.Services.Implementation
{
    public class FileService : IFileService
    {

        private readonly ApplicationDbContext _context;

        public FileService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task PostFileAsync(IFormFile FileData)
        {
            try
            {


                var fileDetails = new Recipe()
                {
                    recipeImageFileName = FileData.FileName,  
                };

                using (var stream = new MemoryStream())
                {
                    FileData.CopyTo(stream);
                    fileDetails.fileData = stream.ToArray();
                }

                var result = this._context.recipes.AddAsync(fileDetails);
                await _context.SaveChangesAsync();  
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task CopySteam(Stream Stream, String DownloadPath)
        {
            using (var fileStream = new FileStream(DownloadPath, FileMode.Create, FileAccess.Write))
            {
                await Stream.CopyToAsync(fileStream);
            }
        }





        public Task DownloadFileById(int id)
        {
            throw new NotImplementedException();
        }

    }
}
