
using System.Linq;
using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var enityType in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = enityType.ClrType.GetProperties().Where(p => p.PropertyType
                     == typeof(decimal));

                     foreach (var property in properties)
                     {
                         modelBuilder.Entity(enityType.Name).Property(property.Name)
                         .HasConversion<double>();
                     }
                }
            }
        }
    } 

    
}