using iceCreamWenApi.Models;

namespace iceCreamWenApi.Services.Interface
{
    public interface IFileService
    {
        public Task PostFileAsync(IFormFile fromFile);
        public Task DownloadFileById(int id);
    }
}
