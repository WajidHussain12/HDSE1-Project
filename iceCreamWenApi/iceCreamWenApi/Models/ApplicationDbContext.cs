using Microsoft.EntityFrameworkCore;
using iceCreamWenApi.Models;

namespace iceCreamWenApi.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Book> books { get; set; } = null;

        public DbSet<Order> orders { get; set; } = null;

        public DbSet<Recipe> recipes { get; set; }

        public DbSet<RecipeWinner> recipeWinners { get; set; } = null;

        public DbSet<User> users { get; set; } = null;

        public DbSet<UserRecipe> userRecipes { get; set; } = null;

        //Noman work

        public DbSet<Varieties> varieties { get; set; }
        public DbSet<AdminLogin> adminLogins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Define foreign key relationship
            modelBuilder.Entity<Varieties>()
                .HasOne(v => v.Recipe)
                .WithMany(r => r.Varieties)
                .HasForeignKey(v => v.RecipeID);
        }
    }
}
